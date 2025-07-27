import { ProductEntity } from '../../entities/product/product.entity';

export type ICreateProduct = {
  productName: string;
  price: number;
  on_hand: number;
  saleCoupon?: number;
};

export type IUpdateProduct = ICreateProduct;

export type ISearchProducts = string;

export type IGetProducts = { queryValue: string; keys: string };

export type RProduct = {
  data: ProductEntity[];
  err: string;
};

export type RProductUser = string;
