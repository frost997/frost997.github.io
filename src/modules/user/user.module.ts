import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user/user.entity';
import { ProductEntity } from '../../entities/product/product.entity';
import { TransactionEntity } from '../../entities/user/transaction.entity';
import { ProductUserEntity } from '../../entities/user/productUser.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ProductEntity,
      TransactionEntity,
      ProductUserEntity,
    ]), // Register the User entity
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
