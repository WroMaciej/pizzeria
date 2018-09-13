import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductVariant } from './../model/product.variant.model';
import { CartService } from './../service/cart.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

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

describe('CartComponent', () => {

  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let domElement: any;
  let httpMock;
  let cartService;

  const product1: Product = {
    id: 1,
    category: Category.Pizza,
    name: 'product1 name',
    description: 'product1 description',
    isActive: true,
    priceOfSize: [11, 21, 31],
    icon: 'product1.png'
  };

  const product2: Product = {
    id: 2,
    category: Category.Pasta,
    name: 'product2 name',
    description: 'product2 description',
    isActive: true,
    priceOfSize: [41, 51],
    icon: 'product2.png'
  };

  const product3: Product = {
    id: 2,
    category: Category.Drink,
    name: 'product3 name',
    description: 'product3 description',
    isActive: true,
    priceOfSize: [6, 9],
    icon: 'product3.png'
  };

  const cartServiceStub = {
    getAllProductQuantities: () => of(
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

    calculateTotalPrice: () => of(1 * 11 + 2 * 31 + 1 * 41 + 1 * 6 + 3 * 9)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [CartComponent],
      providers: [
        { provide: CartService, useValue: cartServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    cartService = TestBed.get(CartService);
    component = fixture.componentInstance;
    domElement = fixture.nativeElement;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should load products from service on init', fakeAsync(() => {
    // GIVEN
    let productQuantities: Array<ProductQuantity>;
    fixture.detectChanges();
    // WHEN
    productQuantities = cartService.getAllProductQuantities(); // component.productQuantities;
    // THEN
    fixture.whenStable().then(() => {
      tick(1000);
      expect(productQuantities.length).toBe(5);
    });
    

  }));
});
