import { Component, signal } from '@angular/core';
import { Header } from './Components/header/header';
import { Products } from './Components/products/products';
import { Footer } from './Components/footer/footer';
@Component({
  selector: 'app-root',
  imports: [Header, Products, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerceApp');
}
