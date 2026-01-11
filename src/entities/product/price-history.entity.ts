import {
  Entity,
  Column,
  ObjectId,
  ObjectIdColumn,
  Index,
  // PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PriceHistory {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  @Index()
  createdAt: Date;

  @Column()
  total_price: number;

  @Column()
  recently_add: number;

  constructor(
    createdAt: Date,
    total_price: number,
    recently_add: number,
    _id: ObjectId,
  ) {
    this._id = _id;
    this.createdAt = createdAt;
    this.total_price = total_price;
    this.recently_add = recently_add;
  }
}
