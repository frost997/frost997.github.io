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
  userName: string;
  ownedQuantities: number;
  contributed: number;
}[];

export type IUpdateProductUser = ICreateProductUser;

export type RProduct = product | string;

export type RProductUser = string;
