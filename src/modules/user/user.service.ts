import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IUpdateUserService, RUser } from './user.type';
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
    @InjectRepository(UserEntity)
    private userRepository: MongoRepository<UserEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: MongoRepository<ProductEntity>,
    @InjectRepository(TransactionEntity)
    private transactionRepository: MongoRepository<TransactionEntity>,
    @InjectRepository(ProductUserEntity)
    private productUserRepository: MongoRepository<ProductUserEntity>,
  ) {}

  async updateUser(params: IUpdateUserService): Promise<RUser> {
    const { userName, userID, productUser } = params;

    const objectUserId = new ObjectId(userID);
    const user = await this.userRepository.findOne({
      where: { _id: objectUserId },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const updateProductUsers = [];
    const updateTransaction = [];
    if (
      [null, undefined, ''].includes(userName) &&
      updateProductUsers?.length
    ) {
      throw new BadRequestException('must input something to update');
    }

    if (![null, undefined, ''].includes(userName)) {
      user.userName = userName;
    }

    const updateProductIDs = productUser.map(
      (prdUser) => new ObjectId(prdUser.productID),
    );
    const existingProducts = await this.productRepository.find({
      where: { _id: { $in: updateProductIDs } },
    });

    if (!existingProducts?.length) {
      throw new BadRequestException(
        'unable to find valid product or current product is out of stock',
      );
    }
    let validProductIds = new Map<string, any>();
    for (let i = 0; i < existingProducts?.length; i++) {
      const { _id, productName, price } = existingProducts[i];
      validProductIds.set(_id.toString(), { productName, price });
    }

    let currentUpdatePRDUser = [];

    const PRDUsers = await this.productUserRepository.find({
      where: { productID: { $in: updateProductIDs }, userID: objectUserId },
    });

    let exitMapPRDUser = new Map<string, any>();
    if (PRDUsers?.length) {
      for (let i = 0; i < PRDUsers?.length; i++) {
        const { productID: prdID, quantity, _id: prdUserID } = PRDUsers[i];
        if (quantity > 0) {
          exitMapPRDUser.set(prdID.toString(), { prdUserID, quantity });
        }
      }
    }

    for (let prdI = 0; prdI < productUser?.length; prdI++) {
      let { productID, quantity } = productUser[prdI];
      let checkValdProd = validProductIds.get(productID);
      if (!checkValdProd) {
        continue;
      }
      const { productName, price } = checkValdProd;
      let updatePrdUser = {};
      if (exitMapPRDUser?.size && exitMapPRDUser.get(productID)) {
        const { prdUserID, quantity: existQuantity } =
          exitMapPRDUser.get(productID);
        quantity += existQuantity;
        updatePrdUser = {
          _id: prdUserID,
        };
      }

      if (quantity >= 0) {
        if (updatePrdUser?.[`_id`]) {
          updateProductUsers.push({
            userID: objectUserId,
            productID: new ObjectId(productID),
            productName: productName,
            quantity,
            ...updatePrdUser,
          });
        } else {
          updateProductUsers.push({
            userID: objectUserId,
            productID: new ObjectId(productID),
            productName: productName,
            quantity,
          });
        }

        updateTransaction.push({
          userName: user.userName,
          userID: objectUserId,
          productID: new ObjectId(productID),
          productName: productName,
          quantity,
          total: quantity * price,
        });
      }
    }
    if (updateProductUsers?.length) {
      const currentProductUser =
        this.productUserRepository.create(updateProductUsers);
      await this.productUserRepository.save(currentProductUser);
    }

    if (updateTransaction?.length) {
      const currentUpdateTransaction =
        this.transactionRepository.create(updateTransaction);
      await this.transactionRepository.save(currentUpdateTransaction);
    }
    const currentUpdateUser = await this.userRepository.save(user);
    return {
      data: {
        userName: currentUpdateUser.userName,
        productUser: updateProductUsers,
      },
      err: null,
    };
  }

  //
  // async updateUser(params: IUpdateUserService): Promise<RUser> {
  //   const { userName, userID, productUser } = params;
  //
  //   const objectUserId = new ObjectId(userID);
  //   const user = await this.userRepository.findOne({
  //     where: { _id: objectUserId },
  //   });
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   const updateProductUsers = [];
  //   const updateTransaction = [];
  //   if ([null, undefined, ''].includes(userName) && updateProductUsers?.length) {
  //     throw new BadRequestException('must input something to update');
  //   }
  //
  //   if (![null, undefined, ''].includes(userName)) {
  //     user.userName = userName;
  //   }
  //   const mapProdID = new Map();
  //   const objectProductIDs = productUser.map((product) => {
  //     const objectProductID = new ObjectId(product.productID);
  //     mapProdID.set(product.productID, product.quantity);
  //     return objectProductID;
  //   });
  //   const currentProduct = await this.productRepository.find({
  //     where: {
  //       _id: { $in: objectProductIDs },
  //     },
  //   });
  //   for (let i = 0; i < currentProduct.length; i++) {
  //     const prod = currentProduct[i];
  //     const currentQuantity = mapProdID.get(prod._id.toString());
  //     // const { productID, quantity } = productUser[i];
  //     // const objectProductID = new ObjectId(productID);
  //
  //     if (currentProduct) {
  //       const total = prod.price * currentQuantity;
  //       updateProductUsers.push({
  //         productName: prod.productName,
  //         price: prod.price,
  //         total,
  //         quantity: currentQuantity,
  //       });
  //       updateTransaction.push({
  //         userName: user.userName,
  //         userID: objectUserId,
  //         productID: prod._id,
  //         productName: prod.productName,
  //         quantity: currentQuantity,
  //         total,
  //       });
  //     }
  //   }
  //   try {
  //     if (updateProductUsers?.length) {
  //       const currentProductUser =
  //         this.productUserRepository.create(updateProductUsers);
  //       await this.productUserRepository.save(currentProductUser);
  //     }
  //
  //     if (updateTransaction?.length) {
  //       const currentUpdateTransaction =
  //         this.transactionRepository.create(updateTransaction);
  //       await this.transactionRepository.save(currentUpdateTransaction);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //
  //   const currentUpdateUser = await this.userRepository.save(user);
  //
  //   return { data: currentUpdateUser, err: null };
  // }
}
