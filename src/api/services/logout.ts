import { api } from 'api';
import { AxiosError, AxiosResponse } from 'axios';

import { getRefreshToken } from 'utils';

export const postLogoutRequest = (): Promise<unknown> | undefined => {
    const refresh = getRefreshToken();

    if (!refresh) {
        localStorage.removeItem('refresh');
        localStorage.removeItem('access');
        return;
    }

    return api
        .post<Promise<unknown>, AxiosResponse<unknown>>(`/user/logout/`, { refresh })
        .then(() => {
            localStorage.removeItem('refresh');
            localStorage.removeItem('access');
        })
        .catch((err: AxiosError<Record<string, string>>) => {
            throw JSON.stringify(err.response?.data);
        });
};
