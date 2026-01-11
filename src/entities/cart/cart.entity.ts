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
  items: CartItem[];

  constructor(_id: ObjectId, userID: ObjectId, items: CartItem[]) {
    this._id = _id;
    this.userID = userID;
    this.items = items;
  }
}

export class CartItem {
  productID: string;
  quantity: number;
}
