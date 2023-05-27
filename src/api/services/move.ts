import { getApiRequest } from 'api';
import { MovesResponse } from 'types/move';

export interface MovesResponseParams {
    checker_id?: number;
    game?: number;
    user?: number;
    is_last_move?: boolean;
}

export const movesRequest = async (params: MovesResponseParams): Promise<MovesResponse[]> => {
    return await getApiRequest('/move/', { params });
};
