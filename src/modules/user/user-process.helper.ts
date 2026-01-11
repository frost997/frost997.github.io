import { DataSource, MongoRepository } from 'typeorm';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ProductEntity } from '../../entities/product/product.entity';
import { UserEntity } from '../../entities/user/user.entity';
import { TransactionEntity } from '../../entities/user/transaction.entity';
import { ProductUserEntity } from '../../entities/user/productUser.entity';
import { ObjectId } from 'mongodb';
import { getMongoRepositoryData } from '../../helper/util';

export class UserProcessHelper {
  private readonly dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  public getUpdateUserDataSource() {
    const productDataSource: MongoRepository<ProductEntity> =
      getMongoRepositoryData<ProductEntity>({
        dataSource: this.dataSource,
        entity: ProductEntity,
      });
    const userDataSource: MongoRepository<UserEntity> =
      getMongoRepositoryData<UserEntity>({
        dataSource: this.dataSource,
        entity: UserEntity,
      });
    const transactionDataSource: MongoRepository<TransactionEntity> =
      getMongoRepositoryData<TransactionEntity>({
        dataSource: this.dataSource,
        entity: TransactionEntity,
      });
    const productUserDataSource: MongoRepository<ProductUserEntity> =
      getMongoRepositoryData<ProductUserEntity>({
        dataSource: this.dataSource,
        entity: ProductUserEntity,
      });
    return {
      productDataSource,
      userDataSource,
      transactionDataSource,
      productUserDataSource,
    };
  }

  public async validateProductAndUser({
    userDataSource,
    productDataSource,
    userName,
    objectUserId,
    updateProductIDs,
  }) {
    try {
      await this.checkUser({
        userDataSource,
        userName,
        objectUserId,
      });
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }

    let existingProducts: ProductEntity[];
    try {
      existingProducts = await this.checkProduct({
        productDataSource,
        updateProductIDs,
      });
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
    return existingProducts;
  }

  public async prepProductAndUser({
    productUserDataSource,
    objectUserId,
    updateProductIDs,
    existingProducts,
  }) {
    const exitMapPRDUser = new Map<string, any>();
    const validProductIds = new Map<string, any>();
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
    return { validProductIds, exitMapPRDUser };
  }

  public createUpdateProductUser({
    productUser,
    validProductIds,
    objectUserId,
    userName,
    exitMapPRDUser,
  }) {
    const invalidProduct = [];
    const updateProducts = [];
    const updateTransaction = [];
    const updateProductUsers = [];
    for (const { productID, quantity } of productUser) {
      // eslint-disable-next-line prefer-const
      const product = validProductIds.get(productID);
      if (!product) {
        invalidProduct.push({
          productID,
          tag: 'product',
          errorMessage: `Can not find productID ${productID}.`,
        });
        continue;
      }
      if (!product.on_hand || product.on_hand <= 0) {
        invalidProduct.push({
          productID,
          tag: 'product',
          errorMessage: `Current product is out of stock.`,
        });
        continue;
      }
      const { productName, price } = product;
      let insertProduct = {};
      if (quantity > 0) {
        product.on_hand -= quantity;
        if (product.on_hand < 0) {
          invalidProduct.push(productID);
          continue;
        }
        updateProducts.push(product);
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
          invalidProduct.push({
            productID,
            tag: 'user',
            errorMessage: `Insufficient stock to proceed.`,
          });
          continue;
        } else {
          insertProduct = {
            userID: objectUserId,
            productID: new ObjectId(productID),
            productName: productName,
            quantity: existQuantity,
            _id: prdUserID,
          };
        }
      } else if (quantity >= 0) {
        insertProduct = {
          userID: objectUserId,
          productID: new ObjectId(productID),
          productName: productName,
          quantity,
        };
      }
      if (insertProduct) {
        updateProductUsers.push(insertProduct);
      }
    }
    if (invalidProduct?.length) {
      return {
        updateProductUsers: null,
        updateTransaction: null,
        updateProducts: null,
        invalidProduct,
      };
    } else {
      return {
        updateProductUsers,
        updateTransaction,
        updateProducts,
        invalidProduct: null,
      };
    }
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
