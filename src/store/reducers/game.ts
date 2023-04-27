import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { getGamesAction } from 'store/actions/game';
import { FetchStatus } from 'types/api';
import { GamesResponse } from 'types/game';

export interface GameState {
    userGames: GamesResponse[];
    fetchUserGamesStatus: FetchStatus;
    error: unknown;
}

const initialState: GameState = {
    fetchUserGamesStatus: FetchStatus.INITIAL,
    userGames: [],
    error: null,
};

const gameSlice = createSlice<GameState, SliceCaseReducers<GameState>>({
    name: 'game',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        builder.addCase(getGamesAction.pending, (state) => {
            state.fetchUserGamesStatus = FetchStatus.FETCHING;
            state.error = null;
        });
        builder.addCase(getGamesAction.fulfilled, (state, { payload }) => {
            state.fetchUserGamesStatus = FetchStatus.FETCHED;
            state.userGames = payload;
        });
        builder.addCase(getGamesAction.rejected, (state, { error }) => {
            state.fetchUserGamesStatus = FetchStatus.ERROR;
            state.error = error;
        });
    },
});

export const gameReducer = gameSlice.reducer;
