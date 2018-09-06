import { Component, OnInit } from '@angular/core';
import {Category} from '../model/category.model';

@Component({
  selector: 'app-collecting',
  templateUrl: './collecting.component.html',
  styleUrls: ['./collecting.component.scss']
})
export class CollectingComponent implements OnInit {

  category: Category;

  

  constructor() { }

  ngOnInit() {
  }

}
