import { SizeService } from './../service/size.service';
import { CartService } from './../service/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../model/category.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from '../model/product.model';
import { DatabaseService } from '../service/database.service';
import { ProductQuantity } from '../model/product.quantity.model'
import { ProductVariant } from '../model/product.variant.model';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-collecting',
  templateUrl: './collecting.component.html',
  styleUrls: ['./collecting.component.scss']
})
export class CollectingComponent implements OnInit, OnDestroy {

  category: Category;
  products: Array<Product>;
  productsSubscription: Subscription;
  isAdminSubscription: Subscription;
  isAdminLogged = false;

  constructor(
    private router: Router,
    readonly databaseService: DatabaseService,
    private cartService: CartService,
    private userService: UserService,
    private sizeService: SizeService) {
    this.category = this.urlToCategory(router.url);
  }

  ngOnInit() {
    console.log('Chosen category: ' + this.category);
    this.isAdminSubscription =
      this.userService
        .isAdminLogged()
        .pipe(finalize(() => this.loadProducts()))
        .subscribe(isAdmin => this.isAdminLogged = isAdmin);
    this.loadProducts();
  }

  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
    if (this.isAdminSubscription) {
      this.isAdminSubscription.unsubscribe();
    }
  }

  goToDetails(productId: number) {
    this.router.navigate(['details/' + productId]);
  }

  addToCart(chosenProduct: Product, chosenSize: number) {
    const productVariant: ProductVariant = {
      product: chosenProduct,
      size: chosenSize
    };
    console.log('Chosen product name: ' + chosenProduct.name + ' with size: ' + chosenSize);
    this.cartService.addProductVariant(productVariant);
    window.alert('Product added.');
  }

  private loadProducts() {
    console.log('Loading products...');

    if (this.isAdminLogged && this.isAdminLogged == true) {
      this.productsSubscription = this.databaseService.getAllProductsByCategory(this.category)
        .subscribe(res => this.products = res);
      console.log('Products loaded for admin.');
    } else {
      this.productsSubscription = this.databaseService.getActiveProductsByCategory(this.category)
        .subscribe(res => this.products = res);
      console.log('Products loaded for customer.');
    }
  }

  private urlToCategory(url: string): Category {
    let categoryName: string = url.slice(1, url.length);
    categoryName = categoryName.charAt(0).toUpperCase() + categoryName.substr(1).toLowerCase();
    return Category[categoryName];
  }



}
