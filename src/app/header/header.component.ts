import { Subscription } from 'rxjs';
import { CartService } from './../service/cart.service';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartTotalPrice: number;

  constructor(private userService: UserService, private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getTotalPrice().subscribe(totalPrice => this.cartTotalPrice = totalPrice);

  }

}
