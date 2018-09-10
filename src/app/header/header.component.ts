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
  loginSubscription: Subscription;
  lastLogin: User;

  constructor(private userService: UserService, private cartService: CartService, private databaseService: DatabaseService) { }

  ngOnInit() {
    this.priceSubscription = this.cartService.getTotalPrice().subscribe(totalPrice => this.cartTotalPrice = totalPrice);
  }

  ngOnDestroy() {
    this.priceSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
  }

  showUserData() {
    //TODO
  }

  private authenticateUser(user: User) {
    if (user && user.id) {
      console.log("User " + user.username + " authenticated.");
      this.showUserData();
      if (user.isAdmin) {
        console.log("User " + user.username + " has admin privileges.");
      } else {
        console.log("User " + user.username + " is a regular customer.");
      }
    }
    else {
      console.log("Wrong username or password.");
    }

  }


  login(data) {
    console.log("Authenticating of user: " + data.username);
    this.loginSubscription = this.databaseService
      .getUserByUsernameAndPassword(data.username, data.password)
      .subscribe(user => this.lastLogin = user, () => { }
        , () => {
          this.lastLogin = this.lastLogin[0];
          this.authenticateUser(this.lastLogin);
        });
  }

}
