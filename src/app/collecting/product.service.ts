import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product.model';
import {Category} from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    readonly http: HttpClient,
  ) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  getProductsFromCategory(category: Category){
    let categoryName : string =  this.categoryToString(category);
    return this.http.get<Product[]>(`/api/products/${categoryName}`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`/api/products/${id}`);
  }

  categoryToString(category: Category): string {
      let categoryName: string = category;
      return categoryName;
  }
}
