import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Product } from '../shared/interfaces/products.interface';
import { NgForOf, NgIf } from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Orders} from '../shared/interfaces/orders.interface';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
  @Input() basket: Product[] = [];
  @Output() sendBasketCount = new EventEmitter<number>();
  @Output() checkoutOrder = new EventEmitter<Product[]>();
  private lastId = 0;

  constructor(private http: HttpClient) {
  }

  addProduct(product: Product) {
    const newProduct = {...product, id: ++this.lastId}; // Assign unique ID
    this.basket.push(newProduct);
    this.sendBasketCount.emit(this.basket.length);
    console.log('Basket after addition:', this.basket);
  }

  removeProduct(product: Product) {
    this.basket = this.basket.filter(p => p.id !== product.id); // Remove by ID
    console.log('Basket after removal:', this.basket);
  }

  checkout() {
    this.http.get<Orders[]>('http://localhost:3000/orders').subscribe((orders) => {
      const nextId = orders.length > 0 ? Math.max(...orders.map(order => order.id)) + 1 : 1;

      this.http.post('http://localhost:3000/orders', {
        id: nextId,
        price: this.basket.reduce((sum, p) => sum + p.price, 0),
        products: this.basket
      }).subscribe(() => {
        this.checkoutOrder.emit(this.basket);
        this.basket = [];
        this.sendBasketCount.emit(this.basket.length);
      });
    });
  }
}
