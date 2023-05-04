import { postApiRequest } from 'api';

interface TokenPromise {
    id: number;
    username: string;
    email: string;
    access: string;
}

export const refreshTokens = async (token: string): Promise<TokenPromise> => {
    return await postApiRequest('/user/refresh-token/', { refresh: token });
};
