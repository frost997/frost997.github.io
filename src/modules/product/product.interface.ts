import { RProduct, ICreateProduct } from './product.type';

export interface IProcuctFunctionParam {
  createProduct(params: ICreateProduct): Promise<RProduct>;

  // deleteProduct(params: IProduct): Promise<RProduct>;
  //
  // readProduct(params: IProduct): Promise<RProduct>;
}
