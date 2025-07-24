import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IUpdateUserService, RUser } from './user.type';
import { DataSource, QueryRunner } from 'typeorm';
import { IUserFunctionParam } from './user.interface';
import { ObjectId } from 'mongodb';
import { ProductEntity } from '../../entities/product/product.entity';
import { TransactionEntity } from '../../entities/user/transaction.entity';
import { ProductUserEntity } from '../../entities/user/productUser.entity';
import { UserProcessHelper } from './user-process.helper';

@Injectable()
export class UserService implements IUserFunctionParam {
  constructor(
    //look at this before continue
    private dataSource: DataSource,
  ) {}

  async updateUser(params: IUpdateUserService): Promise<RUser> {
    const { userName, userID, productUser } = params;

    const objectUserId = new ObjectId(userID);

    const updateProducts = [];
    const updateTransaction = [];
    const updateProductUsers = [];
    const userProcessHelper = new UserProcessHelper(this.dataSource);

    const {
      productDataSource,
      productUserDataSource,
      transactionDataSource,
      userDataSource,
    } = userProcessHelper.getUpdateUserDataSource();
    const updateProductIDs = productUser.map(
      (prdUser) => new ObjectId(prdUser.productID),
    );
    {
    }
    const existingProducts = await userProcessHelper.validateProductAndUser({
      userDataSource,
      productDataSource,
      userName,
      objectUserId,
      updateProductIDs,
    });

    const { validProductIds, exitMapPRDUser } =
      await userProcessHelper.prepProductAndUser({
        productUserDataSource,
        objectUserId,
        updateProductIDs,
        existingProducts,
      });
    const invalidProduct = [];
    for (let prdI = 0; prdI < productUser?.length; prdI++) {
      // eslint-disable-next-line prefer-const
      let { productID, quantity } = productUser[prdI];
      const checkValdProd = validProductIds.get(productID);
      if (!checkValdProd) {
        invalidProduct.push(productID);
        continue;
      }
      if (!checkValdProd.on_hand && checkValdProd.on_hand <= 0) {
        invalidProduct.push(productID);
        continue;
      }
      const { productName, price } = checkValdProd;
      let insertProduct = {};
      if (quantity > 0) {
        checkValdProd.on_hand -= quantity;
        if (checkValdProd.on_hand < 0) {
          invalidProduct.push(productID);
          continue;
        }
        updateProducts.push(checkValdProd);
        updateTransaction.push({
          userName,
          userID: objectUserId,
          productID: new ObjectId(productID),
          productName: productName,
          action: 'purchase',
          quantity,
          total: quantity * price,
        });
      } else if (
        quantity < 0 &&
        exitMapPRDUser?.size &&
        exitMapPRDUser.get(productID)
      ) {
        updateTransaction.push({
          userName,
          userID: objectUserId,
          productID: new ObjectId(productID),
          productName: productName,
          action: 'take',
          quantity,
          total: 0,
        });
      }

      if (exitMapPRDUser?.size && exitMapPRDUser.get(productID)) {
        // eslint-disable-next-line prefer-const
        let { prdUserID, quantity: existQuantity } =
          exitMapPRDUser.get(productID);

        existQuantity += quantity;
        if (existQuantity < 0) {
          existQuantity = 0;
        }

        if (existQuantity >= 0) {
          insertProduct = {
            userID: objectUserId,
            productID: new ObjectId(productID),
            productName: productName,
            quantity: existQuantity,
            _id: prdUserID,
          };
          updateProductUsers.push(insertProduct);
        }
      } else if (quantity >= 0) {
        insertProduct = {
          userID: objectUserId,
          productID: new ObjectId(productID),
          productName: productName,
          quantity,
        };
        updateProductUsers.push(insertProduct);
      }
    }

    const queryRunner: QueryRunner = this.dataSource.createQueryRunner(); // Create a new QueryRunner
    await queryRunner.connect(); // Establish a connection
    await queryRunner.startTransaction(); // Start a transaction
    const promiseUser = [];
    try {
      if (updateProductUsers?.length) {
        const currentProductUser =
          productUserDataSource.create(updateProductUsers);
        promiseUser.push(
          queryRunner.manager.save(ProductUserEntity, currentProductUser),
        );
      }

      if (updateTransaction?.length) {
        const currentUpdateTransaction =
          transactionDataSource.create(updateTransaction);
        promiseUser.push(
          queryRunner.manager.save(TransactionEntity, currentUpdateTransaction),
        );
      }

      if (updateProducts?.length) {
        const currentUpdateProduct = productDataSource.create(updateProducts);
        promiseUser.push(
          queryRunner.manager.save(ProductEntity, currentUpdateProduct),
        );
      }
      if (promiseUser.length) {
        await Promise.all(promiseUser);
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(`${err.message}`);
    } finally {
      await queryRunner.release();
    }

    return {
      data: { userName, productUser: updateProductUsers },
      err: null,
    };
  }
}
