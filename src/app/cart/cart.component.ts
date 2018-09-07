import { Position } from './../model/position.model';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  positions: Array<Position>;

  constructor(private cartService: CartService) {
   }

  ngOnInit() {
    this.loadPositions();
  }

  private loadPositions() {
    this.positions = this.cartService.getAllPositions(); //.getPositionsInCart().subscribe(totalPrice => this.cartTotalPrice = totalPrice);
    console.log("Positions in cart: " + this.positions.length);
  }

}
