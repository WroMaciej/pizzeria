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
  sizeNamesForProducts: Array<Array<string>>;

  products: Array<Product>;


  constructor(private router: Router, readonly service: ProductService, private cartService: CartService) {
    this.category = this.urlToCategory(router.url);
  }

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy() {
  }

  addToCart(chosenProduct: Product, chosenSize: number) {
    const choice: Choice = {
      product: chosenProduct,
      size: chosenSize,
    }
    console.log("Chosen product name: " + chosenProduct.name + " with size: " + chosenSize);
    this.cartService.addChoice(choice);
  }

  private loadProducts() {
    console.log("Chosen category: " + this.category);
    this.service.getProductsByCategory(this.category)
      .subscribe(res => this.products = res);
    console.log("Loading products...");
    this.populateSizeNamesForProducts();
  }

  private sizeNames(category: Category, maxSize: number): Array<string> {
    const sizesPizza: string[] = ["Small (20cm)", "Medium (25cm)", "Big (35cm)", "MONSTER (50cm)"];
    const sizesPasta: string[] = ["Medium (300g)", "Big (400g)", "The biggest (500g)"];
    const sizesDrink: string[] = ["Standard", "Big", "UNLIMITED"];
    if (maxSize < 2 ){
      return [""];
    }

    if (maxSize)
  }

  //TODO think about better place to that
  private populateSizeNamesForProducts(){
    for (let i: number = 0; i < this.products.length; i++){

    }
  }



  private urlToCategory(url: string): Category {
    let categoryName: string = url.slice(1, url.length);
    categoryName = categoryName.charAt(0).toUpperCase() + categoryName.substr(1).toLowerCase();
    return Category[categoryName];
  }



}
