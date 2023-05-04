import { ActionCreatorWithoutPayload, createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { GameListData } from 'pages/GameListPage/GameListPage.types';
import { getGamesAction } from 'store/actions/game';
import { FetchStatus } from 'types/api';
import { GamesResponse } from 'types/game';

export interface GameState {
    userGames: GamesResponse[];
    fetchUserGamesStatus: FetchStatus;
    openGames: GameListData[];
    error: unknown;
}

const initialState: GameState = {
    fetchUserGamesStatus: FetchStatus.INITIAL,
    userGames: [],
    openGames: [],
    error: null,
};

const gameSlice = createSlice<GameState, SliceCaseReducers<GameState>>({
    name: 'game',
    initialState,
    reducers: {
        reset: () => initialState,
        openGamesReducer: (state, action: PayloadAction<GameListData[]>) => {
            const normalizeGames = action.payload.map((game, index) => {
                return { ...game, id: (state.openGames.at(-1)?.id ?? -1) + index + 1 };
            });
            state.openGames = state.openGames.concat(normalizeGames);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGamesAction.pending, (state) => {
                state.fetchUserGamesStatus = FetchStatus.FETCHING;
                state.error = null;
            })
            .addCase(getGamesAction.fulfilled, (state, { payload }) => {
                state.fetchUserGamesStatus = FetchStatus.FETCHED;
                state.userGames = payload;
            })
            .addCase(getGamesAction.rejected, (state, { error }) => {
                state.fetchUserGamesStatus = FetchStatus.ERROR;
                state.error = error;
            });
    },
});

export const { openGamesReducer } = gameSlice.actions;
export const resetGameState = gameSlice.actions.reset as ActionCreatorWithoutPayload<string>;
export const gameReducer = gameSlice.reducer;
