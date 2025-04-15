import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/interfaces/products.interface';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  whitesChecked = true;
  blacksChecked = true;

  @Output() productAdded = new EventEmitter<Product>();

  constructor(private http: HttpClient) {}

  filterProducts(products: Product[], whitesChecked: boolean, blacksChecked: boolean): Product[] {
    return products.filter(product => {
      if (whitesChecked && product.category == 2) {
        return true;
      }
      if (blacksChecked && product.category == 1) {
        return true;
      }
      return false;
    });
  }

  addProductToBasket(product: Product) {
    this.productAdded.emit(product); // Emit only the product
    console.log('Product added:', product);
  }

  ngOnInit(): void {
    this.http.get<Product[]>('http://localhost:3000/products')
      .subscribe((data) => {
        this.products = data;
      });
  }
}
