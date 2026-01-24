import { BadRequestException, Injectable } from '@nestjs/common';
import { IUpdateUserService, RUser } from './user.type';
import { DataSource, MongoRepository } from 'typeorm';
import { IUserFunctionParam } from './user.interface';
import { ObjectId } from 'mongodb';
import { ProductEntity } from '../../entities/product/product.entity';
import { TransactionEntity } from '../../entities/user/transaction.entity';
import { ProductUserEntity } from '../../entities/user/productUser.entity';
import { UserProcessHelper } from './user-process.helper';
import { synchronizeUpdate } from '../../helper/util';
import { UserEntity } from '../../entities/user/user.entity';

@Injectable()
export class UserService implements IUserFunctionParam {
  private productRepository: MongoRepository<ProductEntity>;
  private productUserRepository: MongoRepository<ProductUserEntity>;
  private transactionRepository: MongoRepository<TransactionEntity>;
  private userRepository: MongoRepository<UserEntity>;
  private userProcessHelper: UserProcessHelper;
  private readonly dataSource: DataSource;

  constructor(
    dataSource: DataSource,
    //look at this before continue
  ) {
    this.dataSource = dataSource;
  }

  init() {
    this.userProcessHelper = new UserProcessHelper(this.dataSource);
    const entity = this.userProcessHelper.getUpdateUserDataSource();
    this.productRepository = entity.productDataSource;
    this.productUserRepository = entity.productUserDataSource;
    this.transactionRepository = entity.transactionDataSource;
    this.userRepository = entity.userDataSource;
  }

  async updateUser(params: IUpdateUserService): Promise<RUser> {
    const { userName, userID, productUser } = params;
    if (!productUser?.length || !userID) {
      throw new BadRequestException(
        `Missing user's essential information, please check again`,
      );
    }
    const objectUserId = new ObjectId(userID);

    const updateProductIDs = productUser.map(
      (prdUser) => new ObjectId(prdUser.productID),
    );
    const existingProducts =
      await this.userProcessHelper.validateProductAndUser({
        userDataSource: this.userRepository,
        productDataSource: this.productRepository,
        userName,
        objectUserId,
        updateProductIDs,
      });

    const { validProductIds, exitMapPRDUser } =
      await this.userProcessHelper.prepProductAndUser({
        productUserDataSource: this.productUserRepository,
        objectUserId,
        updateProductIDs,
        existingProducts,
      });

    const {
      updateTransaction,
      updateProducts,
      updateProductUsers,
      invalidProduct,
    } = this.userProcessHelper.createUpdateProductUser({
      productUser,
      validProductIds,
      objectUserId,
      userName,
      exitMapPRDUser,
    });

    if (invalidProduct?.length) {
      const errorMessage = invalidProduct.map(
        (invPrd: any) => `${invPrd.tag} - ${invPrd.errorMessage}`,
      );
      throw new BadRequestException(errorMessage);
    }
    const promises = [];
    if (updateProducts?.length) {
      const currentProduct = this.productUserRepository.create(updateProducts);
      promises.push({
        entity: ProductEntity,
        data: currentProduct,
        action: 'save',
      });
    }

    if (updateProductUsers?.length) {
      const currentProductUser =
        this.productRepository.create(updateProductUsers);
      promises.push({
        entity: ProductUserEntity,
        data: currentProductUser,
        action: 'save',
      });
    }

    if (updateTransaction?.length) {
      const currentUpdateTransaction =
        this.transactionRepository.create(updateTransaction);
      promises.push({
        entity: TransactionEntity,
        data: currentUpdateTransaction,
        action: 'save',
      });
    }
    try {
      await synchronizeUpdate({ dataSource: this.dataSource, promises });
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }

    return {
      data: { userName, productUser: updateProductUsers },
      err: null,
    };
  }

  async getCount(): Promise<any> {
    const countProduct = await this.userRepository.count();
    return countProduct
  }
}
