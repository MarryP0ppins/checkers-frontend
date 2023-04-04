import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction, CombinedState, combineReducers, configureStore, ThunkDispatch } from '@reduxjs/toolkit';

const reducer = combineReducers({});

export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [],
});

export type State = ReturnType<typeof store.getState>;
export type Action = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): ThunkDispatch<CombinedState<State>, null, AnyAction> => useDispatch<Action>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
