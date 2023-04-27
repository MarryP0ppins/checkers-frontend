import { createAsyncThunk } from '@reduxjs/toolkit';
import { userProfileRequest } from 'api/services/user';

export const getUserProfileAction = createAsyncThunk('user/get', async () => {
    return await userProfileRequest();
});
