import { Product } from './../model/product.model';
import { CartService } from './cart.service';
import { ProductVariant } from '../model/product.variant.model';
import { Category } from '../model/category.model';
import { tick, fakeAsync, async, ComponentFixture, TestBed } from '@angular/core/testing';
describe('CartService test', () => {

    const cartService = new CartService();
    let fixture: ComponentFixture<CartService>;
    const someProduct: Product = {
        id: 1,
        category: Category.Pizza,
        name: 'pizza name',
        description: 'pizza description',
        isActive: true,
        priceOfSize: [10, 20, 30],
        icon: 'icon.png'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [CartService],
            providers: []
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartService);
        fixture.detectChanges();
    });


    it('should add product to empty cart', async(() => {
        // GIVEN
        const productVariant: ProductVariant = {
            product: someProduct,
            size: 1
        };
        let totalPrice: number;
        // WHEN
        cartService.addProductVariant(productVariant);
        cartService.getTotalPrice().subscribe(price => totalPrice = price);
        // THEN
        fixture.detectChanges();
        expect(cartService.getProductQuantityNumber()).toBe(1);
        expect(totalPrice).toBe(20);
    }));
});
