import { ISearchUser } from './user.type';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class productUser {
  @IsString()
  @IsNotEmpty()
  productID: string;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class updateUser {
  @IsString()
  userName: string;
  @IsArray()
  @ValidateNested({ each: true }) // ensure each item in the array is validated
  @Type(() => productUser) // required for nested class validation
  productUser: productUser[];
}

export class getUser {
  params: ISearchUser;
}
