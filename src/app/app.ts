import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header';
import { Footer } from './Components/footer/footer';
import { Store } from '@ngrx/store';
import { selectLang } from './Store/Language/language.reducer';
import { inject } from '@angular/core';
@Component({
  selector: 'app-root',
  imports: [HeaderComponent, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerceApp');
  private store = inject(Store);

  constructor() {
    this.store.select(selectLang).subscribe((lang) => {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    });
  }
}
