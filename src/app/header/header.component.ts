import { DatabaseService } from './../service/database.service';
import { Subscription } from 'rxjs';
import { CartService } from './../service/cart.service';
import { UserService } from './../service/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartTotalPrice: number = 0;
  priceSubscription: Subscription;
  //loginSubscription: Subscription;
  userSubscription: Subscription;
  user: User;
  isLogged: boolean;

  constructor(private userService: UserService, private cartService: CartService, private databaseService: DatabaseService) { }

  ngOnInit() {
    this.priceSubscription = this.cartService.getTotalPrice().subscribe(totalPrice => this.cartTotalPrice = totalPrice);
  }

  ngOnDestroy() {
    this.priceSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }



  login(userData){
    this.userService.login(userData);
    this.userSubscription = this.userService.getLoggedUser().subscribe(user => this.user = user);    
  }

  logout(){
    console.log("Logging out...");
    this.userService.logout();
  }
  
}
