import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product/product.entity';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserEntity } from './entities/user/user.entity';
import { UserModule } from './modules/user/user.module';
import { TransactionEntity } from './entities/user/transaction.entity';
import { ProductUserEntity } from './entities/user/productUser.entity';

// import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://Kelvin:bXrSixPBlxZRVmo4@taphoa.mdtds.mongodb.net/?retryWrites=true&w=majority&appName=TapHoa',
      synchronize: true,
      logging: true,
      entities: [
        ProductEntity,
        UserEntity,
        TransactionEntity,
        ProductUserEntity,
      ],
    }),
    TypeOrmModule.forFeature([
      ProductEntity,
      UserEntity,
      TransactionEntity,
      ProductUserEntity,
    ]), // Register for DI in services
    ProductModule,
    AuthModule,
    UserModule,
    // TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
