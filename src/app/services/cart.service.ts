import { CartItem } from './../interfaces/cart-item';
import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSignal = signal<CartItem[]>([]);

  get CartItems() {
    // return this.#cartItemsSignal.value;
    return this.cartItemsSignal();
  }

  cartCount = computed(() => {
    return this.cartItemsSignal().reduce(
      (count, item) => count + item.quantity,
      0
    );
  });

  cartProductTotal = computed(() => {
    return this.cartItemsSignal().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  });

  cartProductsTotal = computed(() => {
    return this.cartItemsSignal().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  });

  getCartItems() {
    return this.cartItemsSignal();
  }

  addToCart(product: Product) {
    console.log('addToCart ', product);

    const existingItem = this.cartItemsSignal().find(
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
      this.cartItemsSignal.update(() => newItems);
    } else {
      this.cartItemsSignal.update((CartItems) => [
        ...CartItems,
        { product, quantity: 1 },
      ]);
    }
    console.log('CartItems ', this.cartItemsSignal());
  }

  incrementQuantity(productId: number) {
    this.cartItemsSignal.update((cartItems) =>
      cartItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  decreaseQuantity(productId: number) {
    this.cartItemsSignal.update((cartItems) =>
      cartItems.map((item) => {
        if (item.quantity > 0) {
          return item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item;
        } else {
          return item;
        }
      })
    );
  }

  removeFromCart(productId: number) {
    let index = this.cartItemsSignal().findIndex(
      (item: any) => item.product.id === productId
    );
    this.cartItemsSignal().splice(index, 1);
    this.cartItemsSignal.update((cartItems) => [...cartItems]);
  }

  constructor() {}
}
