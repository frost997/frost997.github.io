import { product } from '../../entities/product.entity';

export type ICreateProduct = {
  productName: string;
  total: number;
  quantity: number;
  saleCoupon: number;
};
export type RProduct = product | string;
