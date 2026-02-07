
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

abstract class baseCart {

}

export class addToCart extends baseCart { }

export class updateCart extends baseCart { }

export class getCart {
  params: any;
}

// export class deleteProduct {
//   params: IProduct;
// }
//
// export class readProduct {
//   params: IProduct;
// }
