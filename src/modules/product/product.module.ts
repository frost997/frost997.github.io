import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../../entities/product/product.entity';
import { JwtAuthGuard } from '../auth/JWT/JWT-AuthGuard';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]), // Register the Product entity
  ],
  providers: [ProductService, JwtAuthGuard],
  controllers: [ProductController],
})
export class ProductModule {}
