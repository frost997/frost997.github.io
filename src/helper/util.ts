import { ProductEntity } from '../entities/product/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { RProduct } from '../modules/product/product.type';

export class Util {
  @InjectRepository(ProductEntity)
  private productRepository: MongoRepository<ProductEntity>;

  public async getCurrentProduct(params: string[]): Promise<RProduct> {
    const currentProduct = await this.productRepository.find({
      where: {
        productName: { $in: params },
      },
    });
    return { data: currentProduct, err: '' };
  }
}
