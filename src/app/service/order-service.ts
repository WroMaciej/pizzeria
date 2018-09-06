import { Injectable } from '@angular/core';
import {Product} from '../model/Product.Model';

@Injectable()
export class OrderService {

  login: string;
  isAdmin: boolean;
  products: Array<Product>;
  
}