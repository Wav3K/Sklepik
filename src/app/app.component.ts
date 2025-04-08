import {Component, EventEmitter, Output} from '@angular/core';
import {ProductComponent} from './product/product.component';
import { RouterOutlet } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { Product } from './shared/interfaces/products.interface';
import {BasketComponent} from './basket/basket.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductComponent, HttpClientModule, BasketComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  @Output() sendBasket = new EventEmitter<Product[]>();

  title = 'Sklepik';
  basket: Product[] = []; // Store basket data

  updateBasket(updatedBasket: Product[]) {
    this.basket = updatedBasket;
  }


}
