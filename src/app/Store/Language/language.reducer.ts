import { createFeature, createReducer, on } from '@ngrx/store';
import { LanguageActions } from './language.actions';

export interface LanguageState {
  lang: 'en' | 'ar';
}

const savedLang = localStorage.getItem('user_lang') as 'en' | 'ar';

export const initialState: LanguageState = {
  lang: savedLang || 'en'
};

export const languageFeature = createFeature({
  name: 'language',
  reducer: createReducer(
    initialState,
    on(LanguageActions.changeLanguage, (state, { lang }) => ({ ...state, lang }))
  )
});

export const {
  name,
  reducer,
  selectLanguageState,
  selectLang
} = languageFeature;
