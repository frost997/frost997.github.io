import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../../entities/product/product.entity';
import { ICreateProduct, IGetProducts, RProduct } from './product.type';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceHistory } from '../../entities/product/price-history.entity';
import { IProductFunctionParam } from './product.interface';

@Injectable()
export class ProductService implements IProductFunctionParam {
  constructor(
    //look at this before continue
    @InjectRepository(ProductEntity)
    private productRepository: MongoRepository<ProductEntity>,
  ) {}

  async createProduct(params: ICreateProduct[]): Promise<RProduct> {
    const productName = params.map((prod: ICreateProduct) => prod.productName);
    const { data: currentProduct } = await this.getProduct({
      keys: productName[0],
      queryValue: 'productName',
    });

    if (!currentProduct || currentProduct.length == 0) {
      const insertProduct = params.map((product) => {
        const historyObjectID = new ObjectId();
        const total_cost = product.price * product.on_hand;
        const insProd = {
          historyID: historyObjectID,
          createdAt: new Date(),
          modifiedAt: new Date(),
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

  async updateProduct(params: ICreateProduct[]): Promise<RProduct> {
    const updateProduct = [];
    for (let index: number = 0; index < params.length; index++) {
      const { data: currentProduct } = await this.getProduct({
        keys: params[index].productName,
        queryValue: 'productName',
      });
      if (currentProduct && currentProduct.length) {
        currentProduct[0].createdAt = new Date();
        currentProduct[0].modifiedAt = new Date();
        const historyObjectID = new ObjectId();
        const total_cost = params[index].price * params[index].on_hand;
        currentProduct[0].priceHistories.push(
          new PriceHistory(
            currentProduct[0].createdAt,
            total_cost,
            params[index].on_hand,
            historyObjectID,
          ),
        );
        currentProduct[0].price =
          (currentProduct[0].price * currentProduct[0].on_hand +
            params[index].price * params[index].on_hand) /
          (currentProduct[0].on_hand + params[index].on_hand);
        currentProduct[0].price = Math.ceil(currentProduct[0].price);
        currentProduct[0].on_hand += params[index].on_hand;
        // const currentUpdateProduct = this.productRepository.create(params);
        const currentUpdateProduct = await this.productRepository.save(
          currentProduct[0],
        );
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
    const { queryValue, keys } = params;
    const where = { [`${keys}`]: { ['$in']: [queryValue] } };
    const currentProduct = await this.productRepository.find({
      where,
    });
    return { data: currentProduct, err: '' };
  }
}
