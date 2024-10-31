import { Injectable } from '@nestjs/common';
import { product } from '../../entities/product.entity';
// import { user } from '../../entities/user.entity';
// import { AppDataSource } from '../../datasource/data-source';
// import { IProductFunctionParam } from './product.interface';
import {
  ICreateProduct,
  ISearchProducts,
  // ICreateProductUser,
  // IUpdateProductUser,
  RProduct,
  // RProductUser,
} from './product.type';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    //look at this before continue
    @InjectRepository(product)
    private productRepository: MongoRepository<product>,
    // @InjectRepository(user)
    // private userRepository: Repository<user>,
  ) {}

  async createProduct(params: ICreateProduct): Promise<RProduct> {
    const currentProduct = await this.productRepository.findOneBy({
      productName: params.productName,
    });
    if (!currentProduct) {
      const insertProduct = this.productRepository.create(params);
      await this.productRepository.save(insertProduct);
      return insertProduct;
    } else {
      return 'Duplicate product';
    }
  }

  async updateProduct(params: ICreateProduct): Promise<RProduct> {
    const currentProduct = await this.productRepository.findOneBy({
      productName: params.productName,
    });
    if (currentProduct) {
      params['_id'] = currentProduct._id;
      const insertProduct = this.productRepository.create(params);
      await this.productRepository.save(insertProduct);
      return insertProduct;
    } else {
      return 'Product not found';
    }
  }

  async getProduct(params: ISearchProducts): Promise<RProduct[]> {
    const search = params;
    const currentProduct = await this.productRepository.find({
      where: {
        $or: [{ productName: search }, { 'productUser.userName': search }],
      },
    });

    console.log(currentProduct);

    return currentProduct;
  }

  //
  // async createProductUser(params: ICreateProductUser): Promise<RProductUser> {
  //   const currentUserList = params.map((user) => user.userName);
  //   const availableUserList = await this.userRepository.find({ userName: currentUserList });
  //   //add logic check and only insert new product user which exist in user table
  //   return;
  // }
  //
  // async updateProductUser(params: IUpdateProductUser): Promise<RProductUser> {
  //   return;
  // }
}
