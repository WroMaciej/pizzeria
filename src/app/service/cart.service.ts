import { Injectable } from '@angular/core';
import { Position } from '../model/position.model';
import { Product } from '../model/product.model';
import { Choice } from '../model/choice.model';


@Injectable()
export class CartService {
    positions: Array<Position>;

    constructor() {
    }

    addChoice(choiceToAdd: Choice){
        if (this.isChoiceInCart(choiceToAdd)){
            this.positions[this.getChoiceIndexInCart(choiceToAdd)].quantity += 1;
        }
        else {
            const newPosition: Position = {
                choice: choiceToAdd,
                quantity: 1
            }
            this.positions.push(newPosition);
        }
    }

    getPositionsNumber(): number {
        return this.positions.length;
    }

    priceOfPosition(positionNumber: number): number {
        let sum: number = 0;
        this.positions.forEach(
            position => 
            sum += position.choice.product.priceOfSize[position.choice.size] * position.quantity
            );
        return sum;
    }

    calculateTotalPrice(): number {
        let sum: number = 0;
        for (let i = 0; i < this.getPositionsNumber(); i++) {
            sum = sum + this.priceOfPosition(i);
        }
        return sum;
    }

    private getChoiceIndexInCart(choice: Choice): number {
        let index = -1;
        for (let i = 0; i < this.getPositionsNumber(); i++) {
            if (this.positions[i].choice == choice){
                return i;
            }
        }
        return index;
    }

    private isChoiceInCart(choice: Choice): boolean {
        if (this.getChoiceIndexInCart(choice) == -1) {
            return false;
        }
        return true;
    }

}


