import { Product } from './../model/product.model';
import { CartService } from './cart.service';
import { ProductVariant } from '../model/product.variant.model';
import { Category } from '../model/category.model';
import { tick, fakeAsync, async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('CartService test', () => {

    let cartService: CartService;
    const someProduct: Product = {
        id: 1,
        category: Category.Pizza,
        name: 'pizza name',
        description: 'pizza description',
        isActive: true,
        priceOfSize: [10, 20, 30],
        icon: 'icon.png'
    };


    beforeEach(() => {
        cartService = new CartService();
    });


    it('should add product to empty cart',() => {
        // GIVEN
        const productVariant: ProductVariant = {
            product: someProduct,
            size: 1
        };
        // WHEN
        cartService.addProductVariant(productVariant);
        // THEN
        expect(cartService.getProductQuantityNumber()).toBe(1);
        cartService.getTotalPrice().subscribe(totalPrice => expect(totalPrice).toBe(20));
    });
});
