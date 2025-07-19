import {
  Entity,
  Column,
  ObjectId,
  ObjectIdColumn,
  // PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TransactionEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @ObjectIdColumn()
  productID: ObjectId;

  @ObjectIdColumn()
  userID: ObjectId;

  @Column()
  productName: string;

  @Column()
  userName: string;

  @Column()
  quantity: number;

  @Column()
  total: number;
  // This relation can be used to find associated ProductUser entities
  // @ManyToOne(() => User) // Defining the reference to User

  constructor(
    _id: ObjectId,
    productID: ObjectId,
    userID: ObjectId,
    productName: string,
    userName: string,
    quantity: number,
    total: number,
  ) {
    this._id = _id;
    this.productID = productID;
    this.userID = userID;
    this.productName = productName;
    this.userName = userName;
    this.quantity = quantity;
    this.total = total;
  }
}
