import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLoginForm } from 'api/services/login';
import { refreshTokens } from 'api/services/token';
import { AuthUser } from 'types/singin';

import { getRefreshToken } from 'utils';

export const fetchLogin = createAsyncThunk('login/fetchLogin', async (values: AuthUser) => {
    return await fetchLoginForm(values);
});

export const refreshTokensAction = createAsyncThunk('login/refresh', async () => {
    const refresh = getRefreshToken();

    if (refresh) {
        return await refreshTokens(refresh);
    }
});
