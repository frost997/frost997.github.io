import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ProductService } from './product.service';
import {
  createProduct,
  getProduct,
  updateProduct,
  // createProductUser,
} from './product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //
  @Post()
  async createProduct(@Body() createProduct: createProduct) {
    return await this.productService.createProduct([createProduct]);
  }

  @Patch(':productName')
  async updateProduct(
    @Body() updateProduct: updateProduct,
    @Param('productName') productName: string,
  ) {
    return await this.productService.updateProduct([
      { ...updateProduct, productName },
    ]);
  }

  @Get(':params')
  async getProduct(@Param() query: getProduct) {
    const { params } = query;
    if (params) {
      return await this.productService.getProduct({
        queryValue: params,
        keys: 'productName',
      });
    }
    return [];
  }
}
