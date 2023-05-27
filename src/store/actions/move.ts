import { createAsyncThunk } from '@reduxjs/toolkit';
import { movesRequest,MovesResponseParams } from 'api/services/move';

export const getMovesAction = createAsyncThunk('moves/get', async (params: MovesResponseParams) => {
    return await movesRequest(params);
});
