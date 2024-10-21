import {Entity, Column, ObjectId, ObjectIdColumn,PrimaryGeneratedColumn} from 'typeorm';
import { User } from './user.entity';



@Entity()
export class Product {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  productName: string;

  @Column()
  total: number;

  @Column()
  quantity: number;

  @Column({nullable: true})
  saleCoupon?: string;

  // This relation can be used to find associated ProductUser entities
  productUsers: {
    user: User,
    ownedQuantities: number,
    contributed: number
  }[];

  constructor(_id: ObjectId, productName: string,total: number , quantity: number, saleCoupon?: string) {
    this._id = _id;
    this.productName = productName;
    this.total = total
    this.quantity = quantity;
    this.saleCoupon = saleCoupon;
    this.productUsers = [];
  }
}