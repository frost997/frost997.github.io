import { ProductEntity } from '../../entities/product/product.entity';

// export type Product = {
//   total: number;
//   quantity: number;
// };

export type ICreateProduct = ProductEntity;

export type IUpdateProduct = ICreateProduct;

export type ProductUser = {
  userName: string;
  ownedQuantities: number;
  contributed: number;
};

export type ICreateProductUser = {
  productID: string;
  productUser: ProductUser[];
};

export type IUpdateProductUser = ICreateProductUser;

export type ISearchProducts = string;

export type IGetProducts = { queryValue: string; keys: string };

export type RProduct = {
  data: ProductEntity[];
  err: string;
};

export type RProductUser = string;
