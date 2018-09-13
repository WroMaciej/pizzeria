import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { ProductQuantity } from '../model/product.quantity.model';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load products from service on init', () => {
    // GIVEN
    let productQuantities: Array<ProductQuantity>;
    // WHEN
    productQuantities = component.productQuantities;
    // THEN
    expect(productQuantities.length).toBe(//)
    
  });
});
