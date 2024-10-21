import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class user {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  userName: string;

  constructor(id: ObjectId, userName: string) {
    this.id = id;
    this.userName = userName;
  }
}
