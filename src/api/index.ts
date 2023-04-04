import { host } from 'constants/apiMethods';

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { getAccessToken, getRefreshToken } from 'utils/token';

export const api = axios.create({
    baseURL: host,
});

api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = getAccessToken();

        if (token) {
            (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }

        config.withCredentials = window.location.href.includes('.og1.ru');
        return config;
    },
    (error) => {
        Promise.reject(error).catch((err: AxiosError<Record<string, string>>) => {
            throw JSON.stringify(err.response?.data);
        });
    },
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError<never>) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry: boolean };

        if (
            (error.response?.status === 401 || error.response?.status === 400) &&
            originalRequest.url?.includes('/token/refresh/')
        ) {
            localStorage.removeItem('refresh');
            localStorage.removeItem('access');

            document.location.href = `${document.location.hostname}`;

            return;
        }

        if (error.response && error.response.status >= 400 && originalRequest._retry) {
            return Promise.reject(error).catch((error: AxiosError) => {
                throw error;
            });
        }

        const refresh = getRefreshToken();
        if (refresh && originalRequest && !originalRequest._retry && error.response?.status === 401) {
            originalRequest._retry = true;

            return api
                .post<Promise<{ access: string }>, AxiosResponse<{ access: string }>>(`/token/refresh/`, {
                    refresh,
                })
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.setItem('access', res?.data.access);
                        return api(originalRequest);
                    }
                });
        }

        return Promise.reject(error).catch((error: AxiosError) => {
            throw error;
        });
    },
);

export const getApiRequest = <ResponseType, BodyType>(link: string, body?: BodyType): Promise<ResponseType> =>
    api
        .get<ResponseType>(link, body)
        .then((res) => res.data)
        .catch((err: AxiosError<Record<string, string>>) => {
            throw JSON.stringify(err.response?.data);
        });

export const patchApiRequest = <ResponseType, BodyType>(link: string, body?: BodyType): Promise<ResponseType> =>
    api
        .patch<ResponseType>(link, body)
        .then((res) => res.data)
        .catch((err: AxiosError<Record<string, string>>) => {
            throw JSON.stringify(err.response?.data);
        });

export const postApiRequest = <ResponseType, BodyType>(link: string, body?: BodyType): Promise<ResponseType> =>
    api
        .post<ResponseType>(link, body)
        .then((res) => res.data)
        .catch((err: AxiosError<Record<string, string>>) => {
            throw JSON.stringify(err.response?.data);
        });

export const deleteApiRequest = <ResponseType, BodyType>(link: string, params?: BodyType): Promise<ResponseType> =>
    api
        .delete<ResponseType>(link, params)
        .then((res) => res.data)
        .catch((err: AxiosError<Record<string, string>>) => {
            throw JSON.stringify(err.response?.data);
        });
