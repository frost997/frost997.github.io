import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { Roles } from '../auth/Roles/roles.decorator';
import { roles } from 'src/common/constant';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Roles([roles.USER])
  @Post()
  async addToCart() {}

  @Roles([roles.USER])
  @Put()
  async updateCart() {}

  @Roles([roles.USER])
  @Delete()
  async deleteCart() {}

  @Roles([roles.USER])
  @Get()
  async getCart() {}
}
