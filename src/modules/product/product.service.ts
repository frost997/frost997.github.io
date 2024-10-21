import { Injectable } from '@nestjs/common';
import { product } from '../../entities/product.entity';
// import { AppDataSource } from '../../datasource/data-source';
import { IProcuctFunctionParam } from './product.interface';
import { ICreateProduct, RProduct } from './product.type';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService implements IProcuctFunctionParam {
  constructor(
    @InjectRepository(product)
    private productRepository: Repository<product>,
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
}
