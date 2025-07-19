import {
  Entity,
  Column,
  ObjectId,
  ObjectIdColumn,
  Index,
  // PrimaryGeneratedColumn,
} from 'typeorm';
import { PriceHistory } from './price-history.entity';

@Entity()
export class ProductEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  @Index()
  createdAt: Date;

  @Column()
  @Index()
  modifiedAt: Date;

  @Index({ unique: true })
  @Column()
  productName: string;

  @ObjectIdColumn()
  historyID: ObjectId;

  @Column()
  price: number;

  @Column()
  on_hand: number;

  @Column()
  priceHistories: PriceHistory[];

  @Column({ nullable: true })
  saleCoupon?: number;

  constructor(
    _id: ObjectId,
    createdAt: Date,
    modifiedAt: Date,
    productName: string,
    price: number,
    on_hand: number,
    priceHistory: PriceHistory[],
    saleCoupon?: number,
  ) {
    this._id = _id;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
    this.productName = productName;
    this.price = price;
    this.on_hand = on_hand;
    this.priceHistories = priceHistory;
    this.saleCoupon = saleCoupon ? saleCoupon : undefined;
  }
}
