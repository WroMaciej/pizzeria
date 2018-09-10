import { DatabaseService } from './../service/database.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  productId: number;
  product: Product;
  productSubscription: Subscription;

  constructor(private route: ActivatedRoute, private databaseService: DatabaseService) {
    
   }

   ngOnDestroy(){
     this.productSubscription.unsubscribe();
   }

  ngOnInit() {
    this.productId = this.route.snapshot.params.productId;
    console.log("Loading details of product ID: "+ this.productId);
    this.loadProduct(this.productId);
  }

  private loadProduct(productId: number){
    this.productSubscription = this.databaseService.getProduct(productId).subscribe((product) => this.product = product);
  }

  private changeDetails(newData){
    //TODO
  }



}
