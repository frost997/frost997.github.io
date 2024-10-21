import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product } from '../../entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([product]), // Register the Product entity
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
