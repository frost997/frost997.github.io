import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product } from './entities/product.entity';
import { user } from './entities/user.entity';
import { ProductModule } from './modules/product/product.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URL,
      synchronize: true,
      logging: true,
      entities: [product, user],
    }),
    TypeOrmModule.forFeature([product, user]), // Register for DI in services
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
