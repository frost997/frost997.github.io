import { ProductEntity } from '../../entities/product/product.entity';

export type ICreateProduct = {
  productName: string;
  price: number;
  imageURL: string[];
  description: string;
  on_hand: number;
  saleCoupon?: number;
  brand: string;
  categories: string;
};

export type IUpdateProduct = {
  productID: string;
  price: number;
  on_hand: number;
  description: string;
  categories: string;
  brand: string;
  saleCoupon?: number;
};

export type IDeleteProduct = {
  productID: string;
};

export type ISearchProducts = string;

export type IGetProducts = { queryValue: any; keys: any; skip: number };

export type RProduct = {
  data: ProductEntity[];
  err: string;
};

export type RProductUser = string;
