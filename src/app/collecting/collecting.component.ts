import { CartService } from './../service/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../model/category.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductService } from '../service/product.service';
import { Position } from '../model/position.model'
import { Choice } from '../model/choice.model';

@Component({
  selector: 'app-collecting',
  templateUrl: './collecting.component.html',
  styleUrls: ['./collecting.component.scss']
})
export class CollectingComponent implements OnInit, OnDestroy {


  category: Category;

  products: Array<Product>;

  sub: Subscription;


  constructor(private router: Router, readonly service: ProductService, private cartService: CartService) {
    this.category = this.urlToCategory(router.url);
  }

  ngOnInit() {
    console.log("Chosen category: " + this.category);
    this.loadProducts();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addToCart(chosenProduct: Product, chosenSize: number, event: Event) {
    const choice: Choice = {
      product: chosenProduct,
      size: chosenSize,
    }
    console.log("Chosen product name: " + chosenProduct.name + " with size: " + chosenSize);
    this.cartService.addChoice(choice);
  }

  private loadProducts() {
    this.service.getProductsByCategory(this.category)
      .subscribe(res => this.products = res);
    console.log("Loading products...");
  }

  urlToCategory(url: string): Category {
    let categoryName: string = url.slice(1, url.length);
    categoryName = categoryName.charAt(0).toUpperCase() + categoryName.substr(1).toLowerCase();
    return Category[categoryName];
  }



}
