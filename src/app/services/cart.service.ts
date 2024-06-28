import { CartItem } from './../interfaces/cart-item';
import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  #cartItemsSignal = signal<CartItem[]>([]);

  get CartItems() {
    // return this.#cartItemsSignal.value;
    return null;
  }

  // addToCart(product: Product) {
  //   const existingItem = this.#cartItemsSignal.value.find(
  //     (item) => item.product.id === product.id
  //   );
  //   if (existingItem) {
  //     existingItem.quantity += 1;
  //   } else {
  //     this.#cartItemsSignal.update((CartItems) => [
  //       ...CartItems,
  //       { product, quantity: 1 },
  //     ]);
  //   }
  // }

  constructor() {}
}
