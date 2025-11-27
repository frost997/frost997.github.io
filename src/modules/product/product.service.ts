import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProductEntity } from '../../entities/product/product.entity';
import {
  ICreateProduct,
  IGetProducts,
  IUpdateProduct,
  RProduct,
} from './product.type';
import { DataSource, MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { PriceHistory } from '../../entities/product/price-history.entity';
import { IProductFunctionParam } from './product.interface';
import { getMongoRepositoryData } from '../../helper/util';

@Injectable()
export class ProductService implements IProductFunctionParam, OnModuleInit {
  private productRepository: MongoRepository<ProductEntity>;
  private readonly dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  } //look at this before continue

  onModuleInit() {
    this.productRepository = getMongoRepositoryData<ProductEntity>({
      dataSource: this.dataSource,
      entity: ProductEntity, // constructor type
    });
  }

  async createProduct(params: ICreateProduct[]): Promise<RProduct> {
    const productName = params.map((prod: ICreateProduct) => prod.productName);

    const currentProduct = await this.productRepository.find({
      where: { productName: { $in: productName } },
    });

    if (!currentProduct.length) {
      const insertProduct = params.map((product) => {
        const historyObjectID = new ObjectId();
        const total_cost = product.price * product.on_hand;
        const insProd = {
          historyID: historyObjectID,
          createdAt: new Date(),
          modifiedAt: new Date(),
          brand: product.brand,
          categories: product.categories,
          productName: product.productName,
          price: product.price,
          on_hand: product.on_hand,
          imageURL: product.imageUrl,
          priceHistories: [
            new PriceHistory(
              new Date(),
              total_cost,
              product.on_hand,
              historyObjectID,
            ),
          ],
        };
        return this.productRepository.create(insProd);
      });
      await this.productRepository.save(insertProduct);
      return { data: insertProduct, err: '' };
    } else {
      return { data: null, err: 'Duplicate product' };
    }
  }

  async updateProduct(params: IUpdateProduct[]): Promise<RProduct> {
    const updateProduct: ProductEntity[] = [];
    const productID = params.map((prod: IUpdateProduct) => prod.productID);
    const currentProducts: ProductEntity[] = await this.productRepository.find({
      where: { _id: { $in: productID } },
    });
    for (let index: number = 0; index < currentProducts.length; index++) {
      const currentProduct: ProductEntity = currentProducts[index];

      if (currentProduct) {
        currentProduct.createdAt = new Date();
        currentProduct.modifiedAt = new Date();
        const historyObjectID = new ObjectId();
        const total_cost = params[index].price * params[index].on_hand;
        currentProduct.priceHistories.push(
          new PriceHistory(
            currentProduct.createdAt,
            total_cost,
            params[index].on_hand,
            historyObjectID,
          ),
        );
        currentProduct.price =
          (currentProduct.price * currentProduct.on_hand +
            params[index].price * params[index].on_hand) /
          (currentProduct.on_hand + params[index].on_hand);
        currentProduct.price = Math.ceil(currentProduct.price);
        currentProduct.on_hand += params[index].on_hand;
        // const currentUpdateProduct = this.productRepository.create(params);
        const currentUpdateProduct =
          await this.productRepository.save(currentProduct);
        updateProduct.push(currentUpdateProduct);
      }
    }
    if (updateProduct.length) {
      return { data: updateProduct, err: '' };
    } else {
      return { data: null, err: 'Product not found' };
    }
  }

  async getProduct(params: IGetProducts): Promise<RProduct> {
    const { queryValue, keys, skip } = params;
    const queryCondition = { where: {}, take: 20, skip: skip ?? 0 };
    if (queryValue?.length) {
      queryCondition.where = { [`${keys}`]: { ['$in']: [queryValue] } };
    }
    const currentProduct = await this.productRepository.find(queryCondition);
    return { data: currentProduct, err: '' };
  }
}
