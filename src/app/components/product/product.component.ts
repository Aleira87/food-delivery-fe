import { CartService } from './../../services/cart.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() myEvent = new EventEmitter<string>();
  products = 'products';

  constructor(private cartService: CartService) {}

  emitEvent() {
    this.myEvent.emit(this.product.name);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
