import { createAsyncThunk } from '@reduxjs/toolkit';
import { gamesRequest, GamesResponseParams } from 'api/services/game';
import { GameStatus } from 'types/game';

export const getGamesAction = createAsyncThunk('game/get', async (params: GamesResponseParams) => {
    return await gamesRequest(params);
});

export const getUserGamesAction = createAsyncThunk('game/getUserGames', async (username: string) => {
    return await gamesRequest({ status: GameStatus.FINISHED, search: username });
});

export const getCurrentGameAction = createAsyncThunk('game/getCurrentGames', async (username: string) => {
    return await gamesRequest({ status: GameStatus.IN_PROCESS, search: username });
});
