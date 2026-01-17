import { Injectable } from '@nestjs/common';
import { DataSource, MongoRepository } from 'typeorm';
import { CartEntity } from '../../entities/cart/cart.entity';

@Injectable()
export class CartService {
  private cartRepositories: MongoRepository<CartEntity>;
  private readonly datasource: DataSource;

  constructor(datasource: DataSource) {
    this.datasource = datasource;
  }

  init() {}
}
