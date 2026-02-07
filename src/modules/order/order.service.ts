import { Injectable } from '@nestjs/common';
import { OrderEntity } from 'src/entities/order/order.entity';
import { DataSource, MongoRepository } from 'typeorm';

@Injectable()
export class OrderService {
  private OrderRepositories: MongoRepository<OrderEntity>;
  private readonly datasource: DataSource;

  constructor(datasource: DataSource) {
    this.datasource = datasource;
  }

  init() { }
}
