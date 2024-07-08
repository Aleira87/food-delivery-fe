import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  token: string | null = '';
  isOpen: boolean = false;

  constructor(
    private productService: ProductsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.token$.subscribe((token: any) => {
      this.token = token;
      console.log('Token changed:', this.token); // Aggiungi questo per il debug
    });
  }

  logout() {
    this.authService.logout();
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.productService.updateSearchTerm(input.value);
    console.log(input.value);
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }
}
