import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { getUserProfileAction } from 'store/actions/user';
import { FetchStatus } from 'types/api';
import { UserResponse } from 'types/user';

export interface UserState {
    user: UserResponse | null;
    fetchProfileStatus: FetchStatus;
    error: unknown;
}

const initialState: UserState = {
    fetchProfileStatus: FetchStatus.INITIAL,
    user: null,
    error: null,
};

const userSlice = createSlice<UserState, SliceCaseReducers<UserState>>({
    name: 'user',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfileAction.pending, (state) => {
            state.fetchProfileStatus = FetchStatus.FETCHING;
            state.error = null;
        });
        builder.addCase(getUserProfileAction.fulfilled, (state, { payload }) => {
            state.fetchProfileStatus = FetchStatus.FETCHED;
            state.user = payload;
        });
        builder.addCase(getUserProfileAction.rejected, (state, { error }) => {
            state.fetchProfileStatus = FetchStatus.ERROR;
            state.error = error;
        });
    },
});

export const userReducer = userSlice.reducer;
