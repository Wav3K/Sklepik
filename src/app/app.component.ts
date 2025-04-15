import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ProductComponent} from './product/product.component';
import { RouterOutlet } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { Product } from './shared/interfaces/products.interface';
import {BasketComponent} from './basket/basket.component';
import {PanelComponent} from './panel/panel.component';
import {Orders} from './shared/interfaces/orders.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductComponent, HttpClientModule, BasketComponent, PanelComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected basketCount: number = 0;
  protected masterBasket: Orders[] = [];
  @ViewChild(PanelComponent) panelComponent!: PanelComponent;

  onCheckout() {
    this.panelComponent.refreshOrders(); // Trigger a refresh of the orders
  }

  title = 'Sklepik';




}
