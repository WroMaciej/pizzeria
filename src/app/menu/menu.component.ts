import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  categories: Array <Category> = [Category.Pizza, Category.Pasta, Category.Drink];

  constructor() { }

  ngOnInit() {
  }

}
