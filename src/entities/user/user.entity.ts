import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  constructor(_id: ObjectId, userName: string) {
    this._id = _id;
    this.userName = userName;
  }
}
