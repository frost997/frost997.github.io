
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

abstract class baseOrder {

}

export class addToOrder extends baseOrder { }

export class updateOrder extends baseOrder { }

export class getOrder {
  params: any;
}

// export class deleteProduct {
//   params: IProduct;
// }
//
// export class readProduct {
//   params: IProduct;
// }
