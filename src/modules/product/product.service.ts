import { Injectable } from '@nestjs/common';
import { product } from '../../entities/product.entity';
// import { user } from '../../entities/user.entity';
// import { AppDataSource } from '../../datasource/data-source';
// import { IProductFunctionParam } from './product.interface';
import {
  ICreateProduct,
  ICreateProductUser,
  ISearchProducts,
  // ICreateProductUser,
  // IUpdateProductUser,
  RProduct,
  RProductUser,
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
    const { data: currentProduct } = await this.getCurrentProduct([
      params.productName,
    ]);
    if (!currentProduct) {
      const insertProduct = this.productRepository.create(params);
      await this.productRepository.save(insertProduct);
      return { data: insertProduct, err: '' };
    } else {
      return { data: null, err: 'Duplicate product' };
    }
  }

  async updateProduct(params: ICreateProduct): Promise<RProduct> {
    const currentProduct = await this.getCurrentProduct([params.productName]);
    if (currentProduct) {
      params['_id'] = currentProduct[0]._id;
      const insertProduct = this.productRepository.create(params);
      await this.productRepository.save(insertProduct);
      return { data: insertProduct, err: '' };
    } else {
      return { data: null, err: 'Product not found' };
    }
  }

  async getProduct(params: ISearchProducts): Promise<RProduct> {
    const currentProduct = await this.productRepository.find({
      where: {
        $or: [{ productName: params }, { 'productUser.userName': params }],
      },
    });
    return { data: currentProduct, err: '' };
  }

  //
  async createProductUser(params: ICreateProductUser): Promise<RProductUser> {
    const currentProductNames = params.map((product) => product.productName);
    const currentProduct = await this.getCurrentProduct(currentProductNames);
    if (currentProduct) {
      const currentUserList = params.map((user) => user.userName);
      const checkCurrentUser = currentProduct[0].productUser.filter((user) =>
        currentUserList.includes(user.userName),
      );
      if (checkCurrentUser?.length) {
        const errMessage = `User ${checkCurrentUser.join(',')} already exists`;
        return errMessage;
      }
      currentProduct[0].productUser.push(...params);
      const insertProductUser = this.productRepository.create(
        currentProduct[0],
      );
      await this.productRepository.save(insertProductUser);
    }
    //add logic check and only insert new product user which exist in user table
  }

  private async getCurrentProduct(params: string[]): Promise<RProduct> {
    const currentProduct = await this.productRepository.findOneBy({
      where: {
        productName: params,
      },
    });
    return { data: currentProduct, err: '' };
  }
}
