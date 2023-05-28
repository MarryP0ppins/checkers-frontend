import { ActionCreatorWithoutPayload, createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { GameListData } from 'pages/GameListPage/GameListPage.types';
import { getCurrentGameAction, getUserGamesAction } from 'store/actions/game';
import { FetchStatus } from 'types/api';
import { GamesResponse, GameStartProps } from 'types/game';

export interface GameState {
    currentGame: GamesResponse | null;
    userGames: GamesResponse[];
    fetchUserGamesStatus: FetchStatus;
    fetchCurrentGamesStatus: FetchStatus;
    openGames: GameListData[];
    error: unknown;
}

const initialState: GameState = {
    fetchUserGamesStatus: FetchStatus.INITIAL,
    fetchCurrentGamesStatus: FetchStatus.INITIAL,
    currentGame: null,
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
            state.openGames = state.openGames.concat(action.payload);
        },
        removeOpenGamesReducer: (state, action: PayloadAction<string>) => {
            state.openGames = state.openGames.filter((game) => game.socketId !== action.payload);
        },
        setNewGameData: (state, action: PayloadAction<GameStartProps>) => {
            state.currentGame = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentGameAction.pending, (state) => {
                state.fetchCurrentGamesStatus = FetchStatus.FETCHING;
                state.error = null;
            })
            .addCase(getCurrentGameAction.fulfilled, (state, { payload }) => {
                state.fetchCurrentGamesStatus = FetchStatus.FETCHED;
                state.currentGame = payload[0];
            })
            .addCase(getCurrentGameAction.rejected, (state, { error }) => {
                state.fetchCurrentGamesStatus = FetchStatus.ERROR;
                state.error = error;
            });
        builder
            .addCase(getUserGamesAction.pending, (state) => {
                state.fetchUserGamesStatus = FetchStatus.FETCHING;
                state.error = null;
            })
            .addCase(getUserGamesAction.fulfilled, (state, { payload }) => {
                state.fetchUserGamesStatus = FetchStatus.FETCHED;
                state.userGames = payload;
            })
            .addCase(getUserGamesAction.rejected, (state, { error }) => {
                state.fetchUserGamesStatus = FetchStatus.ERROR;
                state.error = error;
            });
    },
});

export const { openGamesReducer, removeOpenGamesReducer, setNewGameData } = gameSlice.actions;
export const resetGameState = gameSlice.actions.reset as ActionCreatorWithoutPayload<string>;
export const gameReducer = gameSlice.reducer;
