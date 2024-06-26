import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';
import { ProductComponent } from '../product/product.component';
import { ActivatedRoute } from '@angular/router';

// import items from '../data/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  filtro: string = '';
  shopId?: number;
  id!: number;
  sub: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    // Carica i prodotti all'inizializzazione

    this.shopId = +this.route.snapshot.parent?.params['id'];
    // usa l'operatore "!" per indicare a TS che il valore non sarà null

    if (this.shopId != null) {
      this.productService.getProductsByShopId(this.shopId).subscribe((data) => {
        console.log(data);
        this.products = data;
        this.filteredProducts = data;
      });
    } else {
      console.error('Shop ID non trovato');
    }

    // this.sub = this.route.params.subscribe((params) => {
    //   this.id = +params['id'];
    //   this.productService.getProductsByShopId(this.id).subscribe((data) => {
    //     this.products = data;
    //     this.filteredProducts = data;
    //   });
    // });

    this.productService.search$.subscribe((term) => {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    });
  }

  handleEvent(event: string) {
    console.log(event);
  }
}
