import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { UserService } from '../user/user.service';
import {
  createProduct,
  getProduct,
  updateProduct,
  createProductUser,
} from './product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('createProduct')
  createProduct(@Body() createProduct: createProduct) {
    const { params } = createProduct;
    return this.productService.createProduct(params);
  }

  @Post('updateProduct')
  updateProduct(@Body() updateProduct: updateProduct) {
    const { params } = updateProduct;
    return this.productService.updateProduct(params);
  }

  @Get(':params')
  getProduct(@Param() query: getProduct) {
    const { params } = query;
    if (params) {
      return this.productService.getProduct(params);
    }
    return [];
  }

  @Post('createProductUser')
  createProductUser(@Body() createProductUser: createProductUser) {
    const { params } = createProductUser;
    return this.productService.createProductUser(params);
  }

  //
  // @Post('updateProductUser')
  // updateProductUser(@Body() updateProductUser: createProductUser) {
  //   const { params } = updateProductUser;
  //   return this.productService.updateProductUser(params);
  // }
}
