import { ProductQuantity } from '../model/product.quantity.model';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  productQuantities: Array<ProductQuantity>;

  totalPrice: number = 0;

  constructor(private cartService: CartService) {
   }

  ngOnInit() {
    this.loadPositions();
  }

  private loadPositions() {
    this.productQuantities = this.cartService.getAllProductQuantities(); //.getPositionsInCart().subscribe(totalPrice => this.cartTotalPrice = totalPrice);
    console.log("Positions in cart: " + this.productQuantities.length);
  }

}
