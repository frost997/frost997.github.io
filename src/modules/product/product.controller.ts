import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  createProduct,
  getProduct,
  updateProduct,
  // createProductUser,
} from './product.dto';
import { JwtAuthGuard } from '../auth/JWT/JWT-AuthGuard';
import { RolesAuthGuard } from '../auth/role/roles-AuthGuard';
import { Roles } from '../auth/role/roles.decorator';
import { roles } from '../../common/constant';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //
  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  @Roles([roles.ADMIN])
  @Post()
  async createProduct(@Body() createProduct: createProduct[]) {
    this.productService.init();
    return await this.productService.createProduct(createProduct);
  }

  @UseGuards(JwtAuthGuard, RolesAuthGuard)
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

  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  @Roles([roles.ADMIN])
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
