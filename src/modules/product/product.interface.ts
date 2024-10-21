import {RProduct,IProduct} from "./product.type"


export interface IProcuctFunctionParam {
  createProduct(params: IProduct): RProduct
  deleteProduct(params: IProduct): RProduct
  readProduct(params: IProduct): RProduct
}