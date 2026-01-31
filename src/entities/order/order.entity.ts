import {
  Entity,
  Column,
  ObjectId,
  ObjectIdColumn,
  // PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CartEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @ObjectIdColumn({ name: 'userID' })
  userID: ObjectId;

  @Column()
  userName: string;

  @Column()
  items: CartItem[];

  @Column()
  status: string

  @Column()
  paymentMethod: string

  constructor(_id: ObjectId, userID: ObjectId, userName: string, items: CartItem[]) {
    this._id = _id;
    this.userID = userID;
    this.userName = userName;
    this.items = items;
  }
}

export class CartItem {
  productID: string;
  price: number;
  quantity: number;
}
