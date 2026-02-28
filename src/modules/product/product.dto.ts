
import { ISearchProducts } from './product.type';
import { IsArray, IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

abstract class baseProduct {
  // @IsString()
  // @IsNotEmpty()
  productName: string;
  // @IsArray()
  // @IsNotEmpty()
  imageURL: string[];
  // @IsString()
  // @IsNotEmpty()
  brand: string;
  // @IsString()
  // @IsNotEmpty()
  description: string;
  // @IsString()
  // @IsNotEmpty()
  categories: string;
  // @IsNumber()
  // @IsNotEmpty()
  price: number;
  // @IsNumber()
  // @IsNotEmpty()
  on_hand: number;
  // @IsNumber()
  saleCoupon?: number;
}

export class createProduct extends baseProduct { }

export class updateProduct extends baseProduct { }

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
