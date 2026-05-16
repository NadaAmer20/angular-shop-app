import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { LanguageActions } from './language.actions';

@Injectable()
export class LanguageEffects {
  private actions$ = inject(Actions);

  saveLanguage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LanguageActions.changeLanguage),
        tap(({ lang }) => {
          localStorage.setItem('user_lang', lang);
          console.log('Language saved to localStorage:', lang);
        })
      ),
    { dispatch: false }
  );
}
