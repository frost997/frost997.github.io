import { Controller, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { createProduct } from './product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('createProduct')
  createProduct(@Body() addProduct: createProduct) {
    const { params } = addProduct;
    return this.productService.createProduct(params);
  }
}
