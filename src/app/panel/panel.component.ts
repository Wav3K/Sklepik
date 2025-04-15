import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../shared/interfaces/products.interface';
import {NgForOf} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {Orders} from '../shared/interfaces/orders.interface';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {
  orderNumber: number = 1000;
  @Input() masterBasket: Orders[] = [];

  constructor(private http: HttpClient) {}

  refreshOrders() {
    this.http.get<Orders[]>('http://localhost:3000/orders')
      .subscribe((data) => {
        this.masterBasket = data; // Update the orders list
      });
  }
  removeOrder(order: Orders) {
    this.http.delete(`http://localhost:3000/orders/${order.id}`).subscribe(() => {
      this.masterBasket = this.masterBasket.filter(existingOrder => existingOrder.id !== order.id); // Remove from UI
      console.log('Order removed:', order);
    }, error => {
      console.error('Failed to remove order:', error);
    });
  }
  ngOnInit(): void {
    this.http.get<Orders[]>('http://localhost:3000/orders')
      .subscribe((data) => {
        this.masterBasket = data;
      });
  }
}
