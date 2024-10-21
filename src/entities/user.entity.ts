import {Entity, Column, ObjectId, ObjectIdColumn} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  constructor(id: ObjectId, name: string) {
    this.id = id
    this.name = name;
  }
}