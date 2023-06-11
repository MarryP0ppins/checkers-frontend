import {
    ActionCreatorWithoutPayload,
    createSlice,
    PayloadAction,
    SerializedError,
    SliceCaseReducers,
} from '@reduxjs/toolkit';
import { getGamesAction } from 'store/actions/game';
import { fetchLogin, refreshTokensAction } from 'store/actions/login';
import { fetchLogout } from 'store/actions/logout';
import { getProfileAction } from 'store/actions/profile';
import { registrationAction } from 'store/actions/registration';
import { getUserProfileAction } from 'store/actions/user';

import { convertError } from 'utils';

interface ErrorState {
    error?: string | null;
    extra?: Record<string, number | unknown | string> | null;
    isFrontend?: boolean;
    notAuth?: boolean;
    needHideButton?: boolean;
    customDescription?: string;
    actionButtonClick?: () => void;
    cancelButtonClick?: () => void;
}

const initialState: ErrorState = {
    error: null,
};

interface ErrorPayload {
    message: string;
    extra: {
        isFrontend?: boolean;
        notAuth?: boolean;
        needHideButton?: boolean;
        customDescription?: string;
    };
    actionButtonClick?: () => void;
    cancelButtonClick?: () => void;
}

const reducer = (state: ErrorState, action: { error: SerializedError }) => {
    const { error } = action;
    const errorData = convertError(error);
    if (typeof errorData === 'string') {
        state.error = errorData;
    } else {
        state.error = errorData.error;
        state.extra = errorData.extra;
    }
};

export const errorSlice = createSlice<ErrorState, SliceCaseReducers<ErrorState>>({
    name: 'error',
    initialState,
    reducers: {
        ready: () => {
            return initialState;
        },
        error: (state, action: PayloadAction<ErrorPayload>) => {
            const { isFrontend, notAuth, needHideButton, customDescription, ...restExtraParams } =
                action.payload.extra ?? {};

            state.error = action.payload.message === 'Rejected' ? 'Ой, что-то пошло не так!' : action.payload.message;
            state.extra = restExtraParams;
            state.notAuth = notAuth;
            state.needHideButton = needHideButton;
            state.isFrontend = typeof isFrontend === 'boolean' ? isFrontend : true;
            state.customDescription = customDescription;
            state.actionButtonClick = action.payload.actionButtonClick;
            state.cancelButtonClick = action.payload.cancelButtonClick;
        },
        clear: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGamesAction.rejected, reducer)
            .addCase(fetchLogin.rejected, reducer)
            .addCase(fetchLogout.rejected, reducer)
            .addCase(refreshTokensAction.rejected, reducer)
            .addCase(registrationAction.rejected, reducer)
            .addCase(getProfileAction.rejected, reducer)
            .addCase(getUserProfileAction.rejected, reducer);
    },
});

export const { ready, error } = errorSlice.actions;
export const clearError = errorSlice.actions.clear as ActionCreatorWithoutPayload<string>;

export const errorReducer = errorSlice.reducer;
