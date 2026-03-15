import { Injectable } from '@nestjs/common';
import { DataSource, MongoRepository } from 'typeorm';
import { CartEntity } from '../../entities/cart/cart.entity';
import { getMongoRepositoryData } from 'src/helper/util';

@Injectable()
export class CartService {
  private cartRepositories: MongoRepository<CartEntity>;
  private readonly datasource: DataSource;

  constructor(datasource: DataSource) {
    this.datasource = datasource;
  }

  onModuleInit() {
    this.cartRepositories = getMongoRepositoryData<CartEntity>({
      dataSource: this.datasource,
      entity: CartEntity, // constructor type
    });
  }

  async createCart(cart, userID): Promise<CartEntity> {
    const newCart = new CartEntity(undefined, userID, cart.items);
    return await this.cartRepositories.save(newCart);
  }
}
