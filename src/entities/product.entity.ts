import {
  Entity,
  Column,
  ObjectId,
  ObjectIdColumn,
  // PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class product {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  productName: string;

  @Column()
  total: number;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  saleCoupon?: number;

  // This relation can be used to find associated ProductUser entities
  // @ManyToOne(() => User) // Defining the reference to User
  @Column()
  productUser: {
    userID: ObjectId;
    userName: string;
    ownedQuantities: number;
    contributed: number;
  }[];

  constructor(
    _id: ObjectId,
    productName: string,
    total: number,
    quantity: number,
    saleCoupon?: number,
  ) {
    this._id = _id;
    this.productName = productName;
    this.total = total;
    this.quantity = quantity;
    this.saleCoupon = saleCoupon;
    this.productUser = [];
  }
}
