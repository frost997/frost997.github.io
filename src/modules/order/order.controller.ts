import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { Roles } from '../auth/Roles/roles.decorator';
import { roles } from 'src/common/constant';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }
    @Roles([roles.USER])
    @Post()
    async CheckOut() {
    }

    @Roles([roles.USER])
    @Put()
    async updateOrder() {

    }

    @Roles([roles.USER])
    @Delete()
    async deleteOrder() {

    }

    @Roles([roles.USER])
    @Get()
    async getOrder() {

    }
}
