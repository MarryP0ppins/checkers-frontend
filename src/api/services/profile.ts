import { getApiRequest } from 'api';
import { ProfileResponse } from 'types/profile';

export interface ProfileParamsRequest {
    username?: string;
}
export const profileRequest = async (params?: ProfileParamsRequest): Promise<ProfileResponse[]> => {
    return await getApiRequest('/profile/', {
        params: {
            search: params?.username,
        },
    });
};
