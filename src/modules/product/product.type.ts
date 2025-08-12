import { ProductEntity } from '../../entities/product/product.entity';

export type ICreateProduct = {
  productName: string;
  price: number;
  on_hand: number;
  saleCoupon?: number;
};

export type IUpdateProduct = {
  productID: string;
  price: number;
  on_hand: number;
  saleCoupon?: number;
};

export type ISearchProducts = string;

export type IGetProducts = { queryValue: any; keys: any };

export type RProduct = {
  data: ProductEntity[];
  err: string;
};

export type RProductUser = string;
