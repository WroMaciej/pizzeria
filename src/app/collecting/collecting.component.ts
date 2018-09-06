import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../model/category.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-collecting',
  templateUrl: './collecting.component.html',
  styleUrls: ['./collecting.component.scss']
})
export class CollectingComponent implements OnInit, OnDestroy {


  category: Category;

  products: Array<Product>;

  sub: Subscription;


  constructor(private router: Router, readonly service: ProductService) {
    this.category = this.urlToCategory(router.url);
  }

  ngOnInit() {
    console.log("Chosen category: " + this.category);
    this.loadProducts();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private loadProducts() {
    this.service.getProducts()
      .subscribe(res => this.products = res);
    console.log("Loading products...");
  }

  urlToCategory(url: string): Category {
    let categoryName: string = url.slice(1, url.length);
    categoryName = categoryName.charAt(0).toUpperCase() + categoryName.substr(1).toLowerCase();
    return Category[categoryName];
  }



}
