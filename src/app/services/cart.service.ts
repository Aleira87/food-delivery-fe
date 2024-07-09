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

  getCartItems() {
    return this.#cartItemsSignal();
  }

  addToCart(product: Product) {
    console.log('addToCart ', product);

    const existingItem = this.#cartItemsSignal().find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      // creo un nuovo array con quantity aggiornato ove existingItem id === product.id
      let newItems: CartItem[] = this.CartItems.map((item) => {
        if (item.product.id === existingItem.product.id) {
          item.quantity++;
        }
        return item;
      });
      // richiamo il signal con update() del nuovo array
      this.#cartItemsSignal.update(() => newItems);
    } else {
      this.#cartItemsSignal.update((CartItems) => [
        ...CartItems,
        { product, quantity: 1 },
      ]);
    }
    console.log('CartItems ', this.#cartItemsSignal());
  }

  constructor() {}
}
