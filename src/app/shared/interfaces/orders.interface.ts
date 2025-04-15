import {Product} from './products.interface';

export interface Orders {
  id: number;
  price: number;
  products: Product[];
}
