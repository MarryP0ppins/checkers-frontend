import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { fetchLogin, refreshTokensAction } from 'store/actions/login';
import { fetchLogout } from 'store/actions/logout';
import { registrationAction } from 'store/actions/registration';
import { FetchStatus } from 'types/api';
import { UserResponse } from 'types/singin';
import { Tokens } from 'types/tokens';

export interface Answer {
    response: string;
}

export interface LoginState {
    isLoggedIn?: boolean;
    fetchStatus: FetchStatus;
    registrationStatus: FetchStatus;
    tokens: Tokens;
    user: UserResponse | null;
    error: unknown;
    logoutFetchStatus: FetchStatus;
}

const initialState: LoginState = {
    fetchStatus: FetchStatus.INITIAL,
    registrationStatus: FetchStatus.INITIAL,
    tokens: { refresh: '', access: '' },
    user: null,
    error: null,
    logoutFetchStatus: FetchStatus.INITIAL,
};

const loginSlice = createSlice<LoginState, SliceCaseReducers<LoginState>>({
    name: 'login',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.pending, (state) => {
            state.fetchStatus = FetchStatus.FETCHING;
            state.error = null;
        });
        builder.addCase(fetchLogin.fulfilled, (state, { payload }) => {
            state.fetchStatus = FetchStatus.FETCHED;
            state.isLoggedIn = true;
            state.tokens = {
                access: payload?.access || '',
                refresh: payload?.refresh || '',
            };
            state.user = {
                id: payload?.id || -1,
                email: payload?.email || '',
                username: payload?.username || '',
            };
            localStorage.setItem('refresh', state.tokens?.refresh || '');
            localStorage.setItem('access', state.tokens?.access || '');
            state.logoutFetchStatus = FetchStatus.INITIAL;
        });
        builder.addCase(fetchLogin.rejected, (state, { error }) => {
            state.fetchStatus = FetchStatus.ERROR;
            state.error = error;
        });
        builder
            .addCase(fetchLogout.fulfilled, (state) => {
                state.fetchStatus = FetchStatus.INITIAL;
                state.isLoggedIn = false;
                state.logoutFetchStatus = FetchStatus.FETCHED;
                state.tokens = { refresh: '', access: '' };
                state.user = null;
                state.error = null;
            })
            .addCase(fetchLogout.pending, (state) => {
                state.logoutFetchStatus = FetchStatus.FETCHING;
            })
            .addCase(fetchLogout.rejected, (state) => {
                state.logoutFetchStatus = FetchStatus.ERROR;
            });
        builder
            .addCase(refreshTokensAction.pending, (state) => {
                state.fetchStatus = FetchStatus.FETCHING;
                state.error = null;
            })
            .addCase(refreshTokensAction.fulfilled, (state, { payload }) => {
                if (!payload) {
                    localStorage.removeItem('refresh');
                    localStorage.removeItem('access');

                    return {
                        ...initialState,
                        isLoggedIn: false,
                    };
                }

                state.user = {
                    id: payload?.id || -1,
                    email: payload?.email || '',
                    username: payload?.username || '',
                };
                state.isLoggedIn = true;
                state.fetchStatus = FetchStatus.FETCHED;
                localStorage.setItem('access', payload.access);
                state.logoutFetchStatus = FetchStatus.INITIAL;
            })
            .addCase(refreshTokensAction.rejected, () => {
                localStorage.removeItem('refresh');
                localStorage.removeItem('access');

                return {
                    ...initialState,
                    isLoggedIn: false,
                };
            });
        builder
            .addCase(registrationAction.pending, (state) => {
                state.registrationStatus = FetchStatus.FETCHING;
                state.error = null;
            })
            .addCase(registrationAction.fulfilled, (state, { payload }) => {
                state.registrationStatus = FetchStatus.FETCHED;
                state.user = {
                    id: payload?.id || -1,
                    email: payload?.email || '',
                    username: payload?.username || '',
                };
            })
            .addCase(registrationAction.rejected, (state) => {
                state.registrationStatus = FetchStatus.ERROR;
            });
    },
});

export const loginReducer = loginSlice.reducer;
