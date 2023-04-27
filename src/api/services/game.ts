import { getApiRequest } from 'api';
import { GamesResponse } from 'types/game';

export interface GamesResponseParams {
    search?: string;
    status?: string;
}

export const gamesRequest = async (params: GamesResponseParams): Promise<GamesResponse[]> => {
    return await getApiRequest('/game/', { params });
};
