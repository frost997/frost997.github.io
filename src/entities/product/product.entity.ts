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
  brand: string;

  @Column()
  categories: string;

  @Column()
  imageURL: string;

  @Column()
  priceHistories: PriceHistory[];

  @Column({ nullable: true })
  saleCoupon?: number;

  constructor(
    _id: ObjectId,
    price: number,
    on_hand: number,
    createdAt: Date,
    modifiedAt: Date,
    productName: string,
    priceHistory: PriceHistory[],
    saleCoupon?: number,
  ) {
    this._id = _id;
    this.price = price;
    this.on_hand = on_hand;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
    this.productName = productName;
    this.priceHistories = priceHistory;
    this.saleCoupon = saleCoupon ? saleCoupon : undefined;
  }
}
