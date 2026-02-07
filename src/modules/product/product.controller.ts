import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  createProduct,
  getProduct,
  updateProduct,
  // createProductUser,
} from './product.dto';
import { RolesAuthGuard } from '../auth/Roles/roles-AuthGuard';
import { roles } from '../../common/constant';
import { Roles } from '../auth/Roles/roles.decorator';
import { Public } from '../auth/Roles/public.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Roles([roles.ADMIN])
  @Post()
  async createProduct(@Body() createProduct: createProduct[]) {
    return await this.productService.createProduct(createProduct);
  }


  @Roles([roles.ADMIN])
  @Patch(':productID')
  async updateProduct(
    @Body() updateProduct: updateProduct,
    @Param('productID') productID: string,
  ) {
    return await this.productService.updateProduct([
      { ...updateProduct, productID },
    ]);
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

