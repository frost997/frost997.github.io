import {
  ICreateProduct,
  ICreateProductUser,
  ISearchProducts,
  IUpdateProduct,
  IUpdateProductUser,
} from './product.type';

export class createProduct {
  params: ICreateProduct;
}

export class updateProduct {
  params: IUpdateProduct;
}

export class getProduct {
  params: ISearchProducts;
}

export class createProductUser {
  params: ICreateProductUser;
}

export class updateProductUser {
  params: IUpdateProductUser;
}

// export class deleteProduct {
//   params: IProduct;
// }
//
// export class readProduct {
//   params: IProduct;
// }
