import { createAsyncThunk } from '@reduxjs/toolkit';
import { postLogoutRequest } from 'api/services/logout';

export const fetchLogout = createAsyncThunk('logout/fetchLogout', async () => {
    return await postLogoutRequest();
});
