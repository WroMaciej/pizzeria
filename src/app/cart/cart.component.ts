import { ProductQuantity } from '../model/product.quantity.model';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Order } from '../model/order.model';
import { DatabaseService } from '../service/database.service';
import { log } from 'util';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  productQuantities: Array<ProductQuantity>;

  cartTotalPrice: number;

  firstName: string;
  lastName: string;
  mobile: string;
  city: string;
  street: string;
  zipCode: string;

  constructor(private cartService: CartService, readonly databaseService: DatabaseService) {
  }

  ngOnInit() {
    this.loadPositions();
  }

  private loadPositions() {
    this.productQuantities = this.cartService.getAllProductQuantities(); //.getPositionsInCart().subscribe(totalPrice => this.cartTotalPrice = totalPrice);
    console.log("Positions in cart: " + this.productQuantities.length);
    this.cartTotalPrice = this.cartService.calculateTotalPrice();
    console.log(this.cartTotalPrice);
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

    this.databaseService.addOrder(confirmedOrder).subscribe(res => console.log(res));
    console.log("Order added to DB");

  }

}
