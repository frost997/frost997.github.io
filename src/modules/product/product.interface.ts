import {
  IUpdateProduct,
  ICreateProduct,
  RProduct,
  IGetProducts,
} from './product.type';

export interface IProductFunctionParam {
  createProduct(params: ICreateProduct[]): Promise<RProduct>;

  updateProduct(params: IUpdateProduct[]): Promise<RProduct>;

  getProduct(params: IGetProducts): Promise<RProduct>;
}

// export class deleteProduct {
//   params: IProduct;
// }
//
// export class readProduct {
//   params: IProduct;
// }
