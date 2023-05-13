import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction, CombinedState, combineReducers, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { errorReducer as error } from 'store/reducers/error';
import { gameReducer as game } from 'store/reducers/game';
import { loaderReducer as loader } from 'store/reducers/loader';
import { loginReducer as login } from 'store/reducers/login';
import { profileReducer as profile } from 'store/reducers/profile';
import { userReducer as user } from 'store/reducers/user';

const reducer = combineReducers({
    error,
    login,
    loader,
    user,
    game,
    profile,
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
