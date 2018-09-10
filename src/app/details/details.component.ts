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
  updateSubscription: Subscription;

  constructor(private route: ActivatedRoute, private databaseService: DatabaseService) {
    
   }

   ngOnDestroy(){
     this.productSubscription.unsubscribe();
     this.updateSubscription.unsubscribe();
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
    console.log("Sending data from form: " + newData);
    const updatedProduct: Product = {
      id: this.product.id,
      category: this.product.category,
      name: newData.name,
      description: newData.description,
      isActive: newData.isActive,
      priceOfSize: undefined,
      icon: newData.icon
    };
    console.log("Trying to update product as: " + updatedProduct);

    this.updateSubscription = this.databaseService.updateProduct(updatedProduct).subscribe();
  }



}
