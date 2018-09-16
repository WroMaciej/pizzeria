import { SizeService } from './../service/size.service';
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
  deleteSubscription: Subscription;

  constructor(readonly databaseService: DatabaseService, private sizeService: SizeService) { }

  ngOnInit() {
    this.loadOrders();
  }

  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

  loadOrders() {
    this.ordersSubscription = this.databaseService.getOrders().subscribe(orders => this.orders = orders);
  }

  deleteOrder(orderId: number) {
    this.deleteSubscription =
     this.databaseService.deleteOrder(orderId).subscribe(() => { }, () => { }, () => { window.alert('Order deleted'); this.loadOrders(); });
  }



}
