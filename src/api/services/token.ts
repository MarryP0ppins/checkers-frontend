import { postApiRequest } from 'api';

interface TokenPromise {
    access: string;
}

export const refreshTokens = async (token: string): Promise<TokenPromise> => {
    return await postApiRequest('/user/refresh-token/', { refresh: token });
};
