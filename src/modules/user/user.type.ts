import { ProductUserEntity } from '../../entities/user/productUser.entity';

// export type Product = {
//   total: number;
//   quantity: number;
// };

export type IUpdateUserController = {
  userName: string;
  productUser: productUser[];
};

export type productUser = {
  productID: string;
  quantity: number;
};

export type IUpdateUserService = IUpdateUserController & { userID: string };

export type ISearchUser = string;

export type RUser = {
  data: { userName: string; productUser: ProductUserEntity[] };
  err: string;
};
