import { ProductVariant } from './../model/product.variant.model';

import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { Product } from '../model/product.model';


@Injectable()
export class SizeService {

    private nameSizesPizza: Array<string> = ['Small (20cm)', 'Medium (25cm)', 'Big (35cm)', 'MONSTER (50cm)'];
    private nameSizesPasta: Array<string> = ['Medium (300g)', 'Big (400g)', 'The biggest (500g)'];
    private nameSizesDrink: Array<string> = ['Standard', 'Big', 'UNLIMITED'];

    constructor() { }

    getSizeNameForProduct(product: Product, size: number): string {
        return this.namesForCategoryAndAvailableSizes(product.category, product.priceOfSize.length)[size];
    }

    private namesForCategoryAndAvailableSizes(category: Category, sizesAvailable: number): Array<string> {
        if (sizesAvailable < 2) {
            return ['Normal'];
        } else {
            if (category === Category.Pizza) {
                return this.nameSizesPizza;
            }
            if (category === Category.Pasta) {
                return this.nameSizesPasta;
            }
            if (category === Category.Drink) {
                return this.nameSizesDrink;
            }
        }
    }

}

