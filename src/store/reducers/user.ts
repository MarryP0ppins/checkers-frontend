import { ActionCreatorWithoutPayload, createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { getUserProfileAction } from 'store/actions/user';
import { FetchStatus } from 'types/api';
import { UserResponse } from 'types/user';

export interface UserState {
    user: UserResponse | null;
    fetchUserProfileStatus: FetchStatus;
    error: unknown;
}

const initialState: UserState = {
    fetchUserProfileStatus: FetchStatus.INITIAL,
    user: null,
    error: null,
};

const userSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
    name: 'user',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfileAction.pending, (state) => {
            state.fetchUserProfileStatus = FetchStatus.FETCHING;
            state.error = null;
        });
        builder.addCase(getUserProfileAction.fulfilled, (state, { payload }) => {
            state.fetchUserProfileStatus = FetchStatus.FETCHED;
            state.user = payload;
        });
        builder.addCase(getUserProfileAction.rejected, (state, { error }) => {
            state.fetchUserProfileStatus = FetchStatus.ERROR;
            state.error = error;
        });
    },
});

export const resetUserState = userSlice.actions.reset as ActionCreatorWithoutPayload<string>;
export const userReducer = userSlice.reducer;
