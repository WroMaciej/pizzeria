import { DatabaseService } from './../service/database.service';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductVariant } from './../model/product.variant.model';
import { CartService } from './../service/cart.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { ProductQuantity } from '../model/product.quantity.model';
import { of } from 'rxjs';
import { Category } from '../model/category.model';
import { Product } from '../model/product.model';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SizeService } from '../service/size.service';

describe('CartComponent', () => {

  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let domElement: any;
  let httpMock: HttpTestingController;
  let router;
  let cartService;
  const sizeService = new SizeService();
  let databaseService;

  const product1: Product = {
    id: 1,
    category: Category.Pizza,
    name: 'product1 name',
    description: 'product1 description',
    isActive: true,
    priceOfSize: [11, 21, 31],
    icon: ''
  };

  const product2: Product = {
    id: 2,
    category: Category.Pasta,
    name: 'product2 name',
    description: 'product2 description',
    isActive: true,
    priceOfSize: [41, 51],
    icon: ''
  };

  const product3: Product = {
    id: 2,
    category: Category.Drink,
    name: 'product3 name',
    description: 'product3 description',
    isActive: true,
    priceOfSize: [6, 9],
    icon: ''
  };

  const cartServiceStub = {
    getAllProductQuantities: () => (
      [
        {
          productVariant: { product: product1, size: 0 },
          quantity: 1
        },
        {
          productVariant: { product: product1, size: 2 },
          quantity: 2
        },
        {
          productVariant: { product: product2, size: 0 },
          quantity: 1
        },
        {
          productVariant: { product: product3, size: 0 },
          quantity: 1
        },
        {
          productVariant: { product: product3, size: 1 },
          quantity: 3
        },
      ]),

    calculateTotalPrice: () => (147),

    clearCart: () => { }
  };

  const databaseServiceStub = {
    addOrder: () => of()
  };

  const routerStub = {
    navigate: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [CartComponent],
      providers: [
        { provide: CartService, useValue: cartServiceStub },
        { provide: DatabaseService, useValue: databaseServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: SizeService, useValue: sizeService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    cartService = TestBed.get(CartService);
    databaseService = TestBed.get(DatabaseService);
    component = fixture.componentInstance;
    domElement = fixture.nativeElement;
    httpMock = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should load products from service on init', async(() => {
    // GIVEN
    let productQuantities: Array<ProductQuantity>;
    let totalPrice: number;
    // WHEN
    productQuantities = component.productQuantities;
    totalPrice = component.cartTotalPrice;
    // THEN
    expect(productQuantities.length).toBe(5);
    expect(productQuantities[0].productVariant.product).toBe(product1);
    expect(productQuantities[0].productVariant.size).toBe(0);
    expect(productQuantities[0].quantity).toBe(1);
    expect(totalPrice).toBe(147);
  }));

  it('should warn empty cart when no products in cart', inject([CartService], cartServiceSpy => {
    // GIVEN
    spyOn(cartServiceSpy, 'getAllProductQuantities').and.returnValue([]);
    fixture = TestBed.createComponent(CartComponent);
    // WHEN
    fixture.detectChanges();
    const emptyCartWarn = document.getElementById('empty-cart-warn');
    // THEN
    expect(emptyCartWarn).not.toBeNull();
  }));

  it('should show correct products number and names', async(() => {
    // GIVEN
    const shownProductsNames = new Array<String>();
    let productTestedForExistance: HTMLElement;
    // WHEN
    for (let i = 0; i < 20; i++) {
      productTestedForExistance = document.getElementById('product' + i);
      if (productTestedForExistance) {
        shownProductsNames.push(document.getElementById('product' + i + '_name').innerHTML);
      }
    }
    // THEN
    expect(shownProductsNames.length).toBe(5);
    expect(shownProductsNames[0]).toBe('product1 name');
    expect(shownProductsNames[1]).toBe('product1 name');
    expect(shownProductsNames[2]).toBe('product2 name');
    expect(shownProductsNames[3]).toBe('product3 name');
    expect(shownProductsNames[4]).toBe('product3 name');
  }));

  it('should show correct total price value and currency', async(() => {
    // GIVEN
    let shownTotalPriceDirty: string;
    let currency: string;
    let value: number;
    // WHEN
    shownTotalPriceDirty = document.getElementById('totalPrice').innerHTML;
    shownTotalPriceDirty = shownTotalPriceDirty.split(': ').pop();
    currency = shownTotalPriceDirty.charAt(0);
    // tslint:disable-next-line:radix
    value = parseInt(shownTotalPriceDirty.substr(1));
    // THEN
    expect(value).toBe(147);
    expect(currency).toBe('€');
  }));

  it('should be valid form for correct inputs', async(() => {
    // GIVEN on setup
    // WHEN
    component.cartForm.patchValue({
      firstName: 'FirstName',
      lastName: 'LastName',
      mobile: '123456789',
      city: 'TheCity',
      street: 'TheStreet 1/1',
      zipCode: '12-456'
    });
    fixture.detectChanges();
    // THEN
    expect(component.cartForm.status).toBe('VALID');
  }));

  it('should be invalid form for empty inputs', async(() => {
    // GIVEN on setup
    // WHEN
    component.cartForm.patchValue({
      firstName: '',
      lastName: '',
      mobile: '',
      city: '',
      street: '',
      zipCode: ''
    });
    fixture.detectChanges();
    // THEN
    expect(component.cartForm.status).toBe('INVALID');
  }));

  it('should be invalid form for too short mobile', async(() => {
    // GIVEN on setup
    // WHEN
    component.cartForm.patchValue({
      firstName: 'FirstName',
      lastName: 'LastName',
      mobile: '12345678',
      city: 'TheCity',
      street: 'TheStreet 1/1',
      zipCode: '12-456'
    });
    fixture.detectChanges();
    // THEN
    expect(component.cartForm.status).toBe('INVALID');
    expect(component.cartForm.controls['mobile'].status).toBe('INVALID');
  }));

  it('should be invalid form for too short zipCode', async(() => {
    // GIVEN on setup
    // WHEN
    component.cartForm.patchValue({
      firstName: 'FirstName',
      lastName: 'LastName',
      mobile: '123456789',
      city: 'TheCity',
      street: 'TheStreet 1/1',
      zipCode: '12-45'
    });
    fixture.detectChanges();
    // THEN
    expect(component.cartForm.status).toBe('INVALID');
    expect(component.cartForm.controls['zipCode'].status).toBe('INVALID');
  }));

  it('should perform order, clear cart and go to confirmation for valid form', async(() => {
    // GIVEN
    component.cartForm.patchValue({
      firstName: 'FirstName',
      lastName: 'LastName',
      mobile: '123456789',
      city: 'TheCity',
      street: 'TheStreet 1/1',
      zipCode: '12-456'
    });
    fixture.detectChanges();
    spyOn(component, 'confirmOrder').and.callThrough();
    spyOn(component, 'goToConfirmation').and.callThrough();
    spyOn(cartService, 'clearCart').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();
    // WHEN
    document.getElementById('button-submit').click();
    // THEN
    expect(document.getElementById('button-submit').getAttribute('disabled')).toBeNull();
    expect(component.confirmOrder).toHaveBeenCalled();
    expect(component.goToConfirmation).toHaveBeenCalled();
    expect(cartService.clearCart).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['confirmation/147']);
  }));

  it('should disable orderind for invalid form', async(() => {
    // GIVEN
    component.cartForm.patchValue({
      firstName: '',
      lastName: '',
      mobile: '',
      city: '',
      street: '',
      zipCode: ''
    });
    fixture.detectChanges();
    spyOn(component, 'confirmOrder').and.callThrough();
    spyOn(component, 'goToConfirmation').and.callThrough();
    spyOn(cartService, 'clearCart').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();
    // WHEN
    document.getElementById('button-submit').click();
    // THEN
    expect(document.getElementById('button-submit').getAttribute('disabled')).not.toBeNull();
    expect(component.confirmOrder).not.toHaveBeenCalled();
    expect(component.goToConfirmation).not.toHaveBeenCalled();
    expect(cartService.clearCart).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  }));

});
