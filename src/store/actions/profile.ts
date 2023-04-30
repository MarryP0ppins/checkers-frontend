import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProfileParamsRequest, profileRequest } from 'api/services/profile';

export const getProfileAction = createAsyncThunk('profile/get', async (params?: ProfileParamsRequest) => {
    return await profileRequest(params);
});
