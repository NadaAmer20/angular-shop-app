import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header';
import { Footer } from './Components/footer/footer';
@Component({
  selector: 'app-root',
  imports: [HeaderComponent, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerceApp');
}
