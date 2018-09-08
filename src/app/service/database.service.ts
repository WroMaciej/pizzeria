import { Order } from './../model/order.model';
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product.model';
import {Category} from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(readonly http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  getProductsByCategory(category: Category): Observable<Product[]>{
    const categoryName : string =  this.categoryToString(category);
    const parameters: HttpParams = new HttpParams().set('category', categoryName);
    return this.http.get<Product[]>('/api/products/', {params: parameters});
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  addOrder(orderToAdd: Order) : Observable<Order> {
    return this.http.post<Order>('/api/orders', orderToAdd);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`/api/products/${id}`);
  }

  categoryToString(category: Category): string {
      let categoryName: string = category;
      return categoryName;
  }
}
