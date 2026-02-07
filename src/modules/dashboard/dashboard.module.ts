import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product/product.entity';
import { UserEntity } from 'src/entities/user/user.entity';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, UserEntity]), // Register the Product entity
  ],
  providers: [ProductService, UserService],
  controllers: [DashboardController],
})
export class DashboardModule { }
