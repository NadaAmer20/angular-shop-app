import { createActionGroup, props } from '@ngrx/store';

export const LanguageActions = createActionGroup({
  source: 'Language',
  events: {
    'Change Language': props<{ lang: 'en' | 'ar' }>()
  }
});
