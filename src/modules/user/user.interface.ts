import {Iuser,Ruser} from "./user.type"


export interface IUserFunctionParam {
  createUser(params: Iuser): Ruser
  deleteUser(params: Iuser): Ruser
  readUser(params: Iuser): Ruser
}