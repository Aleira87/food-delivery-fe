import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  // private url = 'https://food-delivery-be-chi.vercel.app/products';
  private url = 'http://localhost:3000/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProductsByCity(city: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/' + city);
  }

  getProductById(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/' + id);
  }

  updateSearchTerm(term: string) {
    this.searchSubject.next(term);
  }
}
