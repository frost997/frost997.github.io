import { Injectable } from '@nestjs/common';
import { Product } from '../../entities/product.entity';
import { AppDataSource } from '../../datasource/data-source';

@Injectable()
export class ProductService {
  async addProduct(product: Product) {
    const productRepository = AppDataSource.getRepository(Product);
    const currentProduct = await productRepository.findOneBy({ productName: product.productName });
    if (!currentProduct) {
      const insertProduct = productRepository.create(
        product,
      );
      await productRepository.save(insertProduct);
      return insertProduct;
    } else {
      return 'Duplicate product';
    }
  }
}
