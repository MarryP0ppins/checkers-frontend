import { getApiRequest } from 'api';
import { UserResponse } from 'types/user';

export const userProfileRequest = async (): Promise<UserResponse> => {
    return await getApiRequest('/user/');
};
