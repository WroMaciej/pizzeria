import { CartService } from './../service/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../model/category.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductService } from '../service/product.service';
import { ProductQuantity } from '../model/product.quantity.model'
import { ProductVariant } from '../model/product.variant.model';

@Component({
  selector: 'app-collecting',
  templateUrl: './collecting.component.html',
  styleUrls: ['./collecting.component.scss']
})
export class CollectingComponent implements OnInit, OnDestroy {

  category: Category;
  sizeNamesForProducts: Array<Array<string>> = [];
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
    const productVariant: ProductVariant = {
      product: chosenProduct,
      size: chosenSize
    }
    console.log("Chosen product name: " + chosenProduct.name + " with size: " + chosenSize);
    this.cartService.addChoice(productVariant);
  }

  private loadProducts() {
    console.log("Chosen category: " + this.category);
    this.service.getProductsByCategory(this.category)
      .subscribe(res => this.products = res,()=>{}, ()=> this.populateSizeNamesForProducts());
    console.log("Products loaded.");    
  }

  private sizeNames(category: Category, sizesAvailable: number): Array<string> {
    const sizesPizza: Array<string> = ["Small (20cm)", "Medium (25cm)", "Big (35cm)", "MONSTER (50cm)"];
    const sizesPasta: Array<string> = ["Medium (300g)", "Big (400g)", "The biggest (500g)"];
    const sizesDrink: Array<string> = ["Standard", "Big", "UNLIMITED"];
    if (sizesAvailable < 2 ){
      return ["Normal"];
    }
    else{
      if (category == Category.Pizza) {
        return sizesPizza;
      }
      if (category == Category.Pasta) {
        return sizesPasta;
      }
      if (category == Category.Drink) {
        return sizesDrink;
      }
    }
  }

  //TODO think about better place to that
  private populateSizeNamesForProducts(){
    console.log("Number of products: " + this.products.length);
    
    for (let i: number = 0; i < this.products.length; i++){
      this.sizeNamesForProducts.push(this.sizeNames(this.products[i].category, this.products[i].priceOfSize.length));
    }
  }



  private urlToCategory(url: string): Category {
    let categoryName: string = url.slice(1, url.length);
    categoryName = categoryName.charAt(0).toUpperCase() + categoryName.substr(1).toLowerCase();
    return Category[categoryName];
  }



}
