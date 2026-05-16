import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CounterActions = createActionGroup({
  source: 'Counter',
  events: {
    'Increment': emptyProps(),
    'Decrement': emptyProps(),
    'Reset': emptyProps(),
    'Set Value': props<{ value: number }>()
  }
});
