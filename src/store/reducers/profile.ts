import { ActionCreatorWithoutPayload, createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { getProfileAction } from 'store/actions/profile';
import { FetchStatus } from 'types/api';
import { ProfileResponse } from 'types/profile';

export interface ProfileState {
    profiles: ProfileResponse[];
    fetchProfileStatus: FetchStatus;
    error: unknown;
}

const initialState: ProfileState = {
    fetchProfileStatus: FetchStatus.INITIAL,
    profiles: [],
    error: null,
};

const profileSlice = createSlice<ProfileState, SliceCaseReducers<ProfileState>>({
    name: 'profile',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getProfileAction.pending, (state) => {
            state.fetchProfileStatus = FetchStatus.FETCHING;
            state.error = null;
        });
        builder.addCase(getProfileAction.fulfilled, (state, { payload }) => {
            state.fetchProfileStatus = FetchStatus.FETCHED;
            state.profiles = payload;
        });
        builder.addCase(getProfileAction.rejected, (state, { error }) => {
            state.fetchProfileStatus = FetchStatus.ERROR;
            state.error = error;
        });
    },
});

export const resetProfileState = profileSlice.actions.reset as ActionCreatorWithoutPayload<string>;
export const profileReducer = profileSlice.reducer;
