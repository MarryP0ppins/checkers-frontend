import { createAsyncThunk } from '@reduxjs/toolkit';
import { gamesRequest, GamesResponseParams } from 'api/services/game';

export const getGamesAction = createAsyncThunk('game/get', async (params: GamesResponseParams) => {
    return await gamesRequest(params);
});
