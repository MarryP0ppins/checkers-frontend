import { postApiRequest } from 'api';
import { UserReg } from 'types/registration';
import { UserResponse } from 'types/singin';

export const registrationRequest = async (values: UserReg): Promise<UserResponse> => {
    return await postApiRequest('/user/registration/', values);
};
