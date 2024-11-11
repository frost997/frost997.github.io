import { product } from '../../entities/product.entity';

export type ICreateProduct = {
  productName: string;
  total: number;
  quantity: number;
  saleCoupon: number;
};

export type IUpdateProduct = ICreateProduct;

export type ISearchProducts = string;

export type ICreateProductUser = {
  productName: string;
  userName: string;
  ownedQuantities: number;
  contributed: number;
}[];

export type IUpdateProductUser = ICreateProductUser;

export type RProduct = {
  data: product | product[];
  err: string;
};

export type RProductUser = string;
