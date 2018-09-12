import { ProductQuantity } from '../model/product.quantity.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Order } from '../model/order.model';
import { DatabaseService } from '../service/database.service';
import { log } from 'util';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  productQuantities: Array<ProductQuantity>;
  cartTotalPrice: number;
  orderSubscription: Subscription;

  constructor(private cartService: CartService, readonly databaseService: DatabaseService, private router: Router) {
  }

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
    console.log("Positions in cart: " + this.productQuantities.length);
    this.cartTotalPrice = this.cartService.calculateTotalPrice();
    console.log(this.cartTotalPrice);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  confirmOrder(data) {
    const confirmedOrder: Order = {
      id: undefined,
      productQuantities: this.productQuantities,
      totalPrice: this.cartTotalPrice,
      firstName: data.firstName,
      lastName: data.lastName,
      mobile: data.mobile,
      city: data.city,
      street: data.street,
      zipCode: data.zipCode
    };
    this.orderSubscription = this.databaseService.addOrder(confirmedOrder).subscribe(res => console.log(res), () => {}, () => this.goToConfirmation() );
    
  }

  goToConfirmation() {
    const orderPrice: number = this.cartTotalPrice;
    this.clearCart();
    console.log("Order added. Total price: " + orderPrice);
    this.router.navigate(['confirmation/' + orderPrice]);
  }

}
