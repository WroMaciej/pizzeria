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

    it('should add product to empty cart', () => {
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

    it('should group same product variants to one product quantity', () => {
        // GIVEN
        const productVariant: ProductVariant = {
            product: someProduct,
            size: 1
        };
        // WHEN
        cartService.addProductVariant(productVariant);
        cartService.addProductVariant(productVariant);
        // THEN
        expect(cartService.getProductQuantityNumber()).toBe(1);
        cartService.getTotalPrice().subscribe(totalPrice => expect(totalPrice).toBe(40));
    });

    it('should calculate total price', () => {
        // GIVEN
        const productVariant1: ProductVariant = {
            product: someProduct,
            size: 1
        };
        const productVariant2: ProductVariant = {
            product: someProduct,
            size: 2
        };
        cartService.addProductVariant(productVariant1);
        cartService.addProductVariant(productVariant1);
        cartService.addProductVariant(productVariant2);
        let totalPrice: number;
        // WHEN
        totalPrice = cartService.calculateTotalPrice();
        // THEN
        expect(totalPrice).toBe(70);
    });

    it('should clear cart', () => {
        // GIVEN
        const productVariant1: ProductVariant = {
            product: someProduct,
            size: 1
        };
        const productVariant2: ProductVariant = {
            product: someProduct,
            size: 2
        };
        cartService.addProductVariant(productVariant1);
        cartService.addProductVariant(productVariant1);
        cartService.addProductVariant(productVariant2);
        // WHEN
        cartService.clearCart();
        // THEN
        expect(cartService.calculateTotalPrice()).toBe(0);
        expect(cartService.getProductQuantityNumber()).toBe(0);
    });

});
