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

  @Column()
  roles: string[];

  @Column({ nullable: true })
  refresh_token?: string;

  constructor(
    _id: ObjectId,
    userName: string,
    email: string,
    password: string,
    roles: string[],
    refresh_token: string,
  ) {
    this._id = _id;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.refresh_token = refresh_token;
  }
}
