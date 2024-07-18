import { CommonModule } from '@angular/common';
import { CartItem } from './../../interfaces/cart-item';
import { CartService } from './../../services/cart.service';
import { Component, effect, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartCount: number = 0;
  cartProductTotal: number = 0;
  cartProductsTotal: number = 0;

  constructor(private cartService: CartService) {
    effect(() => {
      this.cartItems = this.cartService.getCartItems();
      this.cartCount = this.cartService.getCartItems().length;
      this.cartProductTotal = this.cartService.cartProductTotal();
      this.cartProductsTotal = this.cartService.cartProductsTotal();
    });
  }

  ngOnInit(): void {}

  incrementQuantity(productId: number) {
    this.cartService.incrementQuantity(productId);
  }

  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}
