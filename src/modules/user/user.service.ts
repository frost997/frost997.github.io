import { Injectable } from '@nestjs/common';
import {IUserFunctionParam} from './user.interface'
import { Iuser, Ruser } from './user.type';

@Injectable()
export class UserService implements IUserFunctionParam{
  createUser(user: Iuser):Ruser {
    return
  }

  deleteUser(user: Iuser):Ruser {
    return
  }

  readUser(user: Iuser):Ruser {
    return
  }
}
