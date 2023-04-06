import { postApiRequest } from 'api';

interface TokenPromise {
    access: string;
}

export const refreshTokens = (token: string): Promise<TokenPromise> => {
    return postApiRequest('/user/refresh-token/', { refresh: token });
};
