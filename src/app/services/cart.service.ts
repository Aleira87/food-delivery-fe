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
    return this.#cartItemsSignal();
  }

  addToCart(product: Product) {
    console.log(product);
    const existingItem = this.#cartItemsSignal().find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.#cartItemsSignal.update((CartItems) => [
        ...CartItems,
        { product, quantity: 1 },
      ]);
    }
    console.log(this.#cartItemsSignal());
  }

  getCartItems() {
    return this.#cartItemsSignal();
  }

  constructor() {}
}
