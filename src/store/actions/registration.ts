import { createAsyncThunk } from '@reduxjs/toolkit';
import { registrationRequest } from 'api/services/registration';
import { UserReg } from 'types/registration';

export const registrationAction = createAsyncThunk('Registration', async (values: UserReg) => {
    return await registrationRequest(values);
});
