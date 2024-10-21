import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

import type from 'TapHoaBaMai'

@Module({
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
