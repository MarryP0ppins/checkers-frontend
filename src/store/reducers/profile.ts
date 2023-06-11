import { ActionCreatorWithoutPayload, createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { getEnemyProfileAction, getProfileAction } from 'store/actions/profile';
import { FetchStatus } from 'types/api';
import { ProfileResponse } from 'types/profile';

export interface ProfileState {
    profiles: ProfileResponse[];
    fetchProfileStatus: FetchStatus;
    fetchEnemyProfileStatus: FetchStatus;
    enemyProfile: ProfileResponse | null;
    error: unknown;
}

const initialState: ProfileState = {
    fetchProfileStatus: FetchStatus.INITIAL,
    fetchEnemyProfileStatus: FetchStatus.INITIAL,
    enemyProfile: null,
    profiles: [],
    error: null,
};

const profileSlice = createSlice<ProfileState, SliceCaseReducers<ProfileState>>({
    name: 'profile',
    initialState,
    reducers: {
        reset: () => initialState,
        resetEnemyProfile: (state) => {
            state.enemyProfile = null;
            state.fetchEnemyProfileStatus = FetchStatus.INITIAL
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfileAction.pending, (state) => {
                state.fetchProfileStatus = FetchStatus.FETCHING;
                state.error = null;
            })
            .addCase(getProfileAction.fulfilled, (state, { payload }) => {
                state.fetchProfileStatus = FetchStatus.FETCHED;
                state.profiles = payload;
            })
            .addCase(getProfileAction.rejected, (state, { error }) => {
                state.fetchProfileStatus = FetchStatus.ERROR;
                state.error = error;
            });
        builder
            .addCase(getEnemyProfileAction.pending, (state) => {
                state.fetchEnemyProfileStatus = FetchStatus.FETCHING;
                state.error = null;
            })
            .addCase(getEnemyProfileAction.fulfilled, (state, { payload }) => {
                state.fetchEnemyProfileStatus = FetchStatus.FETCHED;
                console.log(payload)
                state.enemyProfile = payload;
            })
            .addCase(getEnemyProfileAction.rejected, (state, { error }) => {
                state.fetchEnemyProfileStatus = FetchStatus.ERROR;
                state.error = error;
            });
    },
});

export const resetProfileState = profileSlice.actions.reset as ActionCreatorWithoutPayload<string>;
export const resetEnemyProfileState = profileSlice.actions.resetEnemyProfile as ActionCreatorWithoutPayload<string>;
export const profileReducer = profileSlice.reducer;
