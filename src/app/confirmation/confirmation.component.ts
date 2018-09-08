import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  totalPrice: number;

  constructor(private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.totalPrice = this.route.snapshot.params.totalPrice;
  }

}
