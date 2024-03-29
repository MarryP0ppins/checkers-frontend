import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { CheckerColor } from 'classes/Game/game.types';
import { io, Socket } from 'socket.io-client';
import { openGamesReducer, removeOpenGamesReducer, setGameWinner, setNewGameData } from 'store/reducers/game';
import { loaded } from 'store/reducers/loader';
import { enemyMove, newMove } from 'store/reducers/move';
import { resetEnemyProfileState } from 'store/reducers/profile';
import { store } from 'store/store';
import { ClientToServerEvents, ServerToClientEvents } from 'types/api';

import { getAccessToken, getRefreshToken } from 'utils';

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();

        if (token) {
            (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }

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
            originalRequest.url?.includes('/user/refresh-token/')
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
                .post<Promise<{ access: string }>, AxiosResponse<{ access: string }>>(`/user/refresh-token/`, {
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

export const getApiRequest = <ResponseType>(link: string, body?: AxiosRequestConfig): Promise<ResponseType> =>
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

export const deleteApiRequest = <ResponseType>(link: string, params?: AxiosRequestConfig): Promise<ResponseType> =>
    api
        .delete<ResponseType>(link, params)
        .then((res) => res.data)
        .catch((err: AxiosError<Record<string, string>>) => {
            throw JSON.stringify(err.response?.data);
        });

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('ws://localhost:5000/');
//export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('ws://checkers-ws.vercel.app/');

socket.on('openGames', (data) => {
    store.dispatch(openGamesReducer(data));
});

socket.on('removeOpenGame', (socketId) => {
    store.dispatch(removeOpenGamesReducer(socketId));
});

socket.on('enemyMove', (data) => {
    const move = `${data.startPosition}${data.newPositions.length > 1 ? ':' : '-'}${data.newPositions.at(-1) ?? ''}`;
    store.dispatch(newMove({ color: data.isWhite ? CheckerColor.WHITE : CheckerColor.BLACK, newMove: move }));
    store.dispatch(enemyMove(data));
});

socket.on('gameStart', (data) => {
    store.dispatch(setNewGameData(data));
    store.dispatch(loaded({ forced: true }));
});

socket.on('gameEnd', (data) => {
    store.dispatch(resetEnemyProfileState());
    store.dispatch(openGamesReducer(data.openGames));
    store.dispatch(setGameWinner(data.winner));
});