import { Controller, Post, Body, Get, Param, Query, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import {
  createProduct,
  // getProduct,
  // updateProduct,
  // createProductUser,
} from './product.dto';
import { roles } from '../../common/constant';
import { Roles } from '../auth/Roles/roles.decorator';
import { Public } from '../auth/Roles/public.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles([roles.ADMIN])
  @Post()
  async createProduct(@Body() createProduct: createProduct[]) {
    return await this.productService.createProduct(createProduct);
  }

  @Roles([roles.ADMIN])
  @Put(':productID')
  async updateProduct(@Body() updateProduct: any, @Param('productID') productID: string) {
    return await this.productService.updateProduct([{ ...updateProduct, productID }]);
  }

  @Roles([roles.ADMIN])
  @Delete(':productID')
  async deleteProduct(@Param('productID') productID: string) {
    return await this.productService.deleteProduct([{ productID }]);
  }

  @Public()
  @Get()
  async getProduct(
    @Query('search') search?: string,
    @Query('skip') skip?: string,
    // @Query('limit') limit?: number,
  ) {
    const pageSkip: number = Number(skip);
    return (
      (await this.productService.getProduct({
        queryValue: search,
        keys: 'productName',
        skip: pageSkip,
      })) || []
    );
  }
}
