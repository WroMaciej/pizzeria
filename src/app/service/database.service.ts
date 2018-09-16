import { Order } from './../model/order.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';
import { User } from '../model/user.model';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(readonly http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  getActiveProductsByCategory(category: Category): Observable<Product[]> {
    const categoryName: string = this.categoryToString(category);
    const parameters: HttpParams = new HttpParams().set('category', categoryName).append('isActive', "true");
    return this.http.get<Product[]>('/api/products/', { params: parameters });
  }

  getAllProductsByCategory(category: Category): Observable<Product[]> {
    const categoryName: string = this.categoryToString(category);
    const parameters: HttpParams = new HttpParams().set('category', categoryName);
    return this.http.get<Product[]>('/api/products/', { params: parameters });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  updateProduct(productToUpdate: Product): Observable<Product> {
    return this.http.put<Product>(`/api/products/${productToUpdate.id}`, productToUpdate);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`/api/products/${id}`);
  }

  addOrder(orderToAdd: Order): Observable<Order> {
    return this.http.post<Order>('/api/orders', orderToAdd);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`/api/orders/${id}`);
  }

  getOrders() {
    return this.http.get<Order[]>('/api/orders');
  }

  getUserByUsernameAndPassword(username: string, password: string): Observable<User> {
    const parameters: HttpParams = new HttpParams().set('username', username).append('password', password);
    return this.http.get<User>('/api/users/', { params: parameters });
  }

  categoryToString(category: Category): string {
    const categoryName: string = category;
    return categoryName;
  }
}
