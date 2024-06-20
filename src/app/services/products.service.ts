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

  private url = 'https://food-delivery-be-chi.vercel.app/';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/products');
  }

  getProductsByCity(city: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/' + city);
  }

  updateSearchTerm(term: string) {
    this.searchSubject.next(term);
  }
}
