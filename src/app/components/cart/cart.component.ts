import { CommonModule } from '@angular/common';
import { CartItem } from './../../interfaces/cart-item';
import { CartService } from './../../services/cart.service';
import { Component, effect, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartCount: number = 0;

  constructor(private cartService: CartService) {
    effect(() => {
      this.cartCount = this.cartService.getCartItems().length;
    });
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    // console.log(this.cartService.getCartItems());
  }

  totalCartPrice() {
    return this.cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }
}
