import { Injectable } from '@angular/core';
import { Position } from '../model/position.model';
import { Product } from '../model/product.model';
import { Choice } from '../model/choice.model';
import { Subject, Observable } from 'rxjs';


@Injectable()
export class CartService {
    positions: Array<Position> = [];
    private totalPrice = new Subject<number>();

    constructor() {
    }

    addChoice(choiceToAdd: Choice) {
        if (this.isChoiceInCart(choiceToAdd)) {
            console.log("Adding new choice to existing position in cart.");
            this.positions[this.getChoiceIndexInCart(choiceToAdd)].quantity += 1;
        }
        else {
            console.log("Adding new position to cart.");
            const newPosition: Position = {
                choice: choiceToAdd,
                quantity: 1
            }
            this.positions.push(newPosition);
        }
        this.totalPrice.next(this.calculateTotalPrice());
        console.log("Now cart has " + this.getPositionsNumber() + " positions.");
    }

    getTotalPrice(): Observable<number> {
        return this.totalPrice.asObservable();
    }

    getPositionsNumber(): number {
        return this.positions.length;
    }

    priceOfPosition(positionNumber: number): number {
        let position: Position = this.positions[positionNumber];
        return position.choice.product.priceOfSize[position.choice.size] * position.quantity;
    }

    getAllPositions(): Array<Position> {
        return this.positions;
    }

    private calculateTotalPrice(): number {
        let sum: number = 0;
        for (let i = 0; i < this.getPositionsNumber(); i++) {
            sum = sum + this.priceOfPosition(i);
        }
        return sum;
    }

    private areChoicesEqual(choice1: Choice, choice2: Choice): boolean{
        return (choice1.product.id == choice2.product.id && choice1.size == choice2.size);
    }

    private getChoiceIndexInCart(choice: Choice): number {
        let index = -1;
        for (let i = 0; i < this.getPositionsNumber(); i++) {
            if (this.areChoicesEqual(this.positions[i].choice, choice)) {
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


