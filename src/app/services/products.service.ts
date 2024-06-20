import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  // private url = 'https://food-delivery-be-chi.vercel.app/products';
  private url = 'http://localhost:3000/products';

  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProductsByShopID(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/' + id);
  }

  getProductsByCity(city: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/' + city);
  }

  getProductsById(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/' + id);
  }

  updateSearchTerm(term: string) {
    this.searchSubject.next(term);
  }
}
