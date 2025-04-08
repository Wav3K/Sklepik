import {Component, Input} from '@angular/core';
import {Product} from '../shared/interfaces/products.interface';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {
  @Input() basket: Product[] = [];


  removeProduct(product: Product) {
    this.basket = this.basket.filter(p => p !== product);
  }
}
