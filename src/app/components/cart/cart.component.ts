import { CommonModule } from '@angular/common';
import { CartItem } from './../../interfaces/cart-item';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  CartItems: CartItem[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.CartItems = this.cartService.getCartItems();
    // console.log(this.cartService.getCartItems());
  }
}
