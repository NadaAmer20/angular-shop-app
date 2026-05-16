import { createFeature, createReducer, on } from '@ngrx/store';
import { CounterActions } from './counter.actions';

export interface CounterState {
  count: number;
}

export const initialState: CounterState = {
  count: 0
};

export const counterFeature = createFeature({
  name: 'counter',
  reducer: createReducer(
    initialState,
    on(CounterActions.increment, (state) => ({ ...state, count: state.count + 1 })),
    on(CounterActions.decrement, (state) => ({ ...state, count: state.count - 1 })),
    on(CounterActions.reset, (state) => ({ ...state, count: 0 })),
    on(CounterActions.setValue, (state, { value }) => ({ ...state, count: value }))
  )
});

export const {
  name,
  reducer,
  selectCounterState,
  selectCount
} = counterFeature;
