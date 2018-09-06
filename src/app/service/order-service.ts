import { Injectable } from '@angular/core';
import { Product } from '../model/Product.Model';

@Injectable()
export class OrderService {
    userId: number;
    products: Array<Product>;

}