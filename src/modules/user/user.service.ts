import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IUpdateUserService, RUser } from './user.type';
import { DataSource, EntityTarget, QueryRunner } from 'typeorm';
import { IUserFunctionParam } from './user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UserEntity } from '../../entities/user/user.entity';
import { ObjectId } from 'mongodb';
import { ProductEntity } from '../../entities/product/product.entity';
import { TransactionEntity } from '../../entities/user/transaction.entity';
import { ProductUserEntity } from '../../entities/user/productUser.entity';

@Injectable()
export class UserService implements IUserFunctionParam {
  constructor(
    //look at this before continue
    private dataSource: DataSource,
  ) {}

  async updateUser(params: IUpdateUserService): Promise<RUser> {
    const { userName, userID, productUser } = params;

    const exitMapPRDUser = new Map<string, any>();
    const validProductIds = new Map<string, any>();
    const objectUserId = new ObjectId(userID);
    const productDataSource: MongoRepository<ProductEntity> =
      this.getMongoRepository<ProductEntity>({
        dataSource: this.dataSource,
        entity: ProductEntity,
      });
    const userDataSource: MongoRepository<UserEntity> =
      this.getMongoRepository<UserEntity>({
        dataSource: this.dataSource,
        entity: UserEntity,
      });
    const transactionDataSource: MongoRepository<TransactionEntity> =
      this.getMongoRepository<TransactionEntity>({
        dataSource: this.dataSource,
        entity: TransactionEntity,
      });
    const productUserDataSource: MongoRepository<ProductUserEntity> =
      this.getMongoRepository<ProductUserEntity>({
        dataSource: this.dataSource,
        entity: ProductUserEntity,
      });

    const updateProducts = [];
    const updateTransaction = [];
    const updateProductUsers = [];

    try {
      await this.checkUser({ userDataSource, userName, objectUserId });
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }

    const updateProductIDs = productUser.map(
      (prdUser) => new ObjectId(prdUser.productID),
    );

    let existingProducts: ProductEntity[];
    try {
      existingProducts = await this.checkProduct({
        productDataSource,
        updateProductIDs,
      });
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
    for (let i = 0; i < existingProducts?.length; i++) {
      const { _id } = existingProducts[i];
      validProductIds.set(_id.toString(), { ...existingProducts[i] });
    }

    const PRDUsers = await productUserDataSource.find({
      where: { productID: { $in: updateProductIDs }, userID: objectUserId },
    });

    if (PRDUsers?.length) {
      for (let i = 0; i < PRDUsers?.length; i++) {
        const { productID: prdID, quantity, _id: prdUserID } = PRDUsers[i];
        if (quantity > 0) {
          exitMapPRDUser.set(prdID.toString(), { prdUserID, quantity });
        }
      }
    }
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

  private getMongoRepository<T>(params: {
    dataSource: DataSource;
    entity: EntityTarget<T>; // constructor type
  }): MongoRepository<T> {
    const { dataSource, entity } = params;
    return dataSource.getMongoRepository<T>(entity);
  }

  private async checkUser({ userDataSource, userName, objectUserId }) {
    const user = await userDataSource.findOne({
      where: { _id: objectUserId },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    if ([null, undefined, ''].includes(userName)) {
      throw new Error('must input something to update');
    }

    if (![null, undefined, ''].includes(userName)) {
      user.userName = userName;
    }
  }

  private async checkProduct({
    productDataSource,
    updateProductIDs,
  }): Promise<ProductEntity[]> {
    const existingProducts = await productDataSource.find({
      where: { _id: { $in: updateProductIDs } },
    });

    if (!existingProducts?.length) {
      throw new BadRequestException(
        'unable to find valid product or current product is out of stock',
      );
    }
    return existingProducts;
  }
}
