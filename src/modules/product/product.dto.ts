import { ISearchProducts } from './product.type';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

abstract class baseProduct {
  @IsString()
  @IsNotEmpty()
  productName: string;
  @IsString()
  @IsNotEmpty()
  price: number;
  @IsNumber()
  @IsNotEmpty()
  on_hand: number;
  @IsNumber()
  saleCoupon?: number;
}

export class createProduct extends baseProduct {}

export class updateProduct extends baseProduct {}

export class getProduct {
  params: ISearchProducts;
}

// export class deleteProduct {
//   params: IProduct;
// }
//
// export class readProduct {
//   params: IProduct;
// }
