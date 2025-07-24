import {
  Entity,
  Column,
  ObjectId,
  ObjectIdColumn,
  // PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductUserEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @ObjectIdColumn({ name: 'productID' })
  productID: ObjectId;

  @ObjectIdColumn({ name: 'userID' })
  userID: ObjectId;

  @Column()
  productName: string;

  @Column()
  quantity: number;

  constructor(
    _id: ObjectId,
    productID: ObjectId,
    userID: ObjectId,
    quantity: number,
    productName: string,
  ) {
    this._id = _id;
    this.productID = productID;
    this.userID = userID;
    this.quantity = quantity;
    this.productName = productName;
  }
}
