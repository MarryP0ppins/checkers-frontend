import { createAsyncThunk } from '@reduxjs/toolkit';
import { profileByIdRequest, ProfileParamsRequest, profileRequest } from 'api/services/profile';

export const getProfileAction = createAsyncThunk('profile/get', async (params?: ProfileParamsRequest) => {
    return await profileRequest(params);
});

export const getEnemyProfileAction = createAsyncThunk('profile/getEnemy', async (userId: number) => {
    return await profileByIdRequest(userId);
});
