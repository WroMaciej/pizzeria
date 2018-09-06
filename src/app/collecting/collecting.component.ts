import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category.model';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-collecting',
  templateUrl: './collecting.component.html',
  styleUrls: ['./collecting.component.scss']
})
export class CollectingComponent implements OnInit {


  category: Category;

  products: Array<Product>;



  constructor(private router: Router) {
    this.category = this.urlToCategory(router.url);
  }

  ngOnInit() {
    console.log("Chosen category: " + this.category);
  }

  populateProductList(){
    
  }

  urlToCategory(url: string): Category {
    let categoryName: string = url.slice(1, url.length);
    categoryName = categoryName.charAt(0).toUpperCase() + categoryName.substr(1).toLowerCase();
    return Category[categoryName];
  }



}
