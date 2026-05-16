import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserAuthService } from '../../Services/user-auth';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { LanguageActions } from '../../Store/Language/language.actions';
import { selectLang } from '../../Store/Language/language.reducer';
import { inject } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  private store = inject(Store);
  currentLang = this.store.selectSignal(selectLang);

  constructor(private authService: UserAuthService) {}

  ngOnInit(): void {
    this.authService.getLoggedStatus().subscribe(status => {
      this.isLogged = status;
    });
  }

  logout() {
    this.authService.logout();
  }

  toggleLang() {
    const newLang = this.currentLang() === 'en' ? 'ar' : 'en';
    this.store.dispatch(LanguageActions.changeLanguage({ lang: newLang }));
  }
}
