import { SizeService } from './../service/size.service';
import { ProductQuantity } from '../model/product.quantity.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Order } from '../model/order.model';
import { DatabaseService } from '../service/database.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  productQuantities: Array<ProductQuantity>;
  cartTotalPrice: number;
  orderSubscription: Subscription;

  cartForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    mobile: new FormControl('', [Validators.required, Validators.minLength(9)]),
    city: ['', Validators.required],
    street: ['', Validators.required],
    zipCode: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private cartService: CartService,
    private sizeService: SizeService,
    readonly databaseService: DatabaseService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.loadPositions();
  }

  ngOnDestroy() {
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
  }

  private loadPositions() {
    this.productQuantities = this.cartService.getAllProductQuantities();
    console.log('Positions in cart: ' + this.productQuantities.length);
    this.cartTotalPrice = this.cartService.calculateTotalPrice();
    console.log(this.cartTotalPrice);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  confirmOrder() {
    const confirmedOrder: Order = {
      id: undefined,
      productQuantities: this.productQuantities,
      totalPrice: this.cartTotalPrice,
      firstName: this.cartForm.controls['firstName'].value,
      lastName: this.cartForm.controls['lastName'].value,
      mobile: this.cartForm.controls['mobile'].value,
      city: this.cartForm.controls['city'].value,
      street: this.cartForm.controls['street'].value,
      zipCode: this.cartForm.controls['zipCode'].value
    };
    this.orderSubscription
      = this.databaseService
        .addOrder(confirmedOrder)
        .subscribe(res => console.log(res), () => { }, () => this.goToConfirmation());
  }

  goToConfirmation() {
    const orderPrice: number = this.cartTotalPrice;
    this.clearCart();
    console.log('Order added. Total price: ' + orderPrice);
    this.router.navigate(['confirmation/' + orderPrice]);
  }

}
