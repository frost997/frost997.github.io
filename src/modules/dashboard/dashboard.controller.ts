import { Controller, Get } from '@nestjs/common';
import { roles } from 'src/common/constant';
import { Roles } from 'src/modules/auth/Roles/roles.decorator';
import { ProductService } from 'src/modules/product/product.service';
import { UserService } from 'src/modules/user/user.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly userService: UserService, private readonly productService: ProductService) { }

    @Roles([roles.ADMIN])
    @Get()
    async getCountDashBoard(): Promise<any> {
        this.userService.init();
        const [productCount, userCount] = await Promise.all([this.productService.getCount(), this.userService.getCount()])
        return { productCount: productCount, userCount: userCount }
    }
}
