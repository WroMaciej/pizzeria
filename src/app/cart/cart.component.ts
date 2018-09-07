import { ProductQuantity } from '../model/product.quantity.model';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Order } from '../model/order.model';

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

  constructor(private cartService: CartService) {
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

  confirmOrder(data){
    const confirmedOrder: Order = {
      productQuantities: this.productQuantities,
      totalPrice: this.cartTotalPrice,
      firstName: data.firstName,
      lastName: data.lastName,
      mobile: data.mobile,
      city: data.city,
      street: data.street,
      zipCode: data.zipCode
    }
    
    //TODO save to DB
    
  }

}
