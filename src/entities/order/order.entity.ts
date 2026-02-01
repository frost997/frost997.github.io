import {
  Entity,
  Column,
  ObjectId,
  ObjectIdColumn,
  // PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @ObjectIdColumn({ name: 'userID' })
  userID: ObjectId;

  @Column()
  userName: string;

  @Column()
  items: OrderItem[];

  @Column()
  status: string

  @Column()
  paymentMethod: string

  constructor(_id: ObjectId, userID: ObjectId, userName: string, items: OrderItem[]) {
    this._id = _id;
    this.userID = userID;
    this.userName = userName;
    this.items = items;
  }
}

export class OrderItem {
  productID: string;
  price: number;
  quantity: number;
}
