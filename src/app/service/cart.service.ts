import { ProductVariant } from './../model/product.variant.model';
import { Injectable } from '@angular/core';
import { ProductQuantity } from '../model/product.quantity.model';
import { Product } from '../model/product.model';
import { Subject, Observable } from 'rxjs';


@Injectable()
export class CartService {
    productQuantities: Array<ProductQuantity> = [];
    private totalPrice = new Subject<number>();

    constructor() {
    }

    addChoice(productVariantToAdd: ProductVariant) {
        if (this.isProductVariantInCart(productVariantToAdd)) {
            console.log("Adding new choice to existing position in cart.");
            this.productQuantities[this.getProductVariantIndexInCart(productVariantToAdd)].quantity += 1;
        }
        else {
            console.log("Adding new position to cart.");
            const newPosition: ProductQuantity = {
                productVariant: productVariantToAdd,
                quantity: 1
            }
            this.productQuantities.push(newPosition);
        }
        this.totalPrice.next(this.calculateTotalPrice());
        console.log("Now cart has " + this.getProductQuantityNumber() + " positions.");
    }

    getTotalPrice(): Observable<number> {
        return this.totalPrice.asObservable();
    }

    getProductQuantityNumber(): number {
        return this.productQuantities.length;
    }

    priceOfProductQuantity(positionNumber: number): number {
        let position: ProductQuantity = this.productQuantities[positionNumber];
        return position.productVariant.product.priceOfSize[position.productVariant.size] * position.quantity;
    }

    getAllProductQuantities(): Array<ProductQuantity> {
        return this.productQuantities;
    }

    calculateTotalPrice(): number {
        let sum: number = 0;
        for (let i = 0; i < this.getProductQuantityNumber(); i++) {
            sum = sum + this.priceOfProductQuantity(i);
        }
        return sum;
    }

    clearCart() {
        this.productQuantities.length = 0;
        this.totalPrice.next(0);
    }

    private areProductVariantsEqual(variant1: ProductVariant, variant2: ProductVariant): boolean {
        return (variant1.product.id == variant2.product.id && variant1.size == variant2.size);
    }

    private getProductVariantIndexInCart(productVariant: ProductVariant): number {
        let index = -1;
        for (let i = 0; i < this.getProductQuantityNumber(); i++) {
            if (this.areProductVariantsEqual(this.productQuantities[i].productVariant, productVariant)) {
                return i;
            }
        }
        return index;
    }

    private isProductVariantInCart(choice: ProductVariant): boolean {
        if (this.getProductVariantIndexInCart(choice) == -1) {
            return false;
        }
        return true;
    }



}


