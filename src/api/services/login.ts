import { api } from 'api';
import { AxiosError, AxiosResponse } from 'axios';
import { AuthUser } from 'types/singin';

export interface LoginResponse {
    id: number;
    email: string;
    username: string;
    refresh: string;
    access: string;
}

export const fetchLoginForm = (values: AuthUser): Promise<LoginResponse | undefined> => {
    return api
        .post<Promise<LoginResponse>, AxiosResponse<LoginResponse>>(`/user/login/`, {
            username: values.username,
            password: values.password,
        })
        .then((res) => res?.data)
        .catch((err: AxiosError<Record<string, string>>) => {
            throw JSON.stringify(err.response?.data);
        });
};
