import { Controller, Get, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { Roles } from '../auth/Roles/roles.decorator';
import { roles } from 'src/common/constant';
import { DeleteDateColumn } from 'typeorm';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }
    @Roles([roles.USER])
    @Post()
    async addToCart() {
    }

    @Roles([roles.USER])
    @Post()
    async updateCart() {

    }

    @Roles([roles.USER])
    @DeleteDateColumn()
    async deleteCart() {

    }

    @Roles([roles.USER])
    @Get()
    async getCart() {

    }
}
