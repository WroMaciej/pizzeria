import { Injectable } from '@angular/core';
import { Position } from '../model/position.model';

@Injectable()
export class CartService {
    userId: number;
    positions: Array<Position>;

    calculateTotalPrice(): number {
        let sum: number = 0;
        this.positions.forEach(position=> sum = sum + position.product.priceOfSize[position.size]);
        return sum;
    }

}