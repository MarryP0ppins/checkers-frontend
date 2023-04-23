import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction, CombinedState, combineReducers, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { loaderReducer as loader } from 'store/reducers/loader';
import { loginReducer as login } from 'store/reducers/login';

const reducer = combineReducers({
    login,
    loader,
});

export const store = configureStore({
    reducer,
    devTools: true,
    enhancers: [],
});

export type State = ReturnType<typeof store.getState>;
export type Action = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): ThunkDispatch<CombinedState<State>, null, AnyAction> => useDispatch<Action>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
