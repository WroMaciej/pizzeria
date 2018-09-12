import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../service/database.service';
import { Order } from '../model/order.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Array<Order>;
  ordersSubscription: Subscription;

  constructor(readonly databaseService: DatabaseService) { }

  ngOnInit() {
    this.loadOrders();
  }

  ngOnDestroy(){
    this.ordersSubscription.unsubscribe();
  }

  loadOrders() {
    this.ordersSubscription = this.databaseService.getOrders().subscribe(orders => this.orders = orders)
  }



}
