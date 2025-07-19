import { IUpdateUserService, RUser } from './user.type';

export interface IUserFunctionParam {
  updateUser(params: IUpdateUserService): Promise<RUser>;
}
