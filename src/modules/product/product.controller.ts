import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  createProduct,
  getProduct,
  updateProduct,
  // createProductUser,
} from './product.dto';
import { JwtAuthGuard } from '../auth/JWT/JWT-AuthGuard';
// import { RolesAuthGuard } from '../auth/Roles/roles-AuthGuard';
// import { roles } from '../../common/constant';
// import { Roles } from '../auth/Roles/roles.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  //
  @UseGuards(JwtAuthGuard)
  // @Roles([roles.ADMIN])
  @Post()
  async createProduct(@Body() createProduct: createProduct[]) {
    return await this.productService.createProduct(createProduct);
  }

  @UseGuards(JwtAuthGuard)
  // @Roles([roles.ADMIN])
  @Patch(':productID')
  async updateProduct(
    @Body() updateProduct: updateProduct,
    @Param('productID') productID: string,
  ) {
    return await this.productService.updateProduct([
      { ...updateProduct, productID },
    ]);
  }

  // @UseGuards(JwtAuthGuard, RolesAuthGuard)
  // @Roles([roles.ADMIN])
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
