import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoaderState {
    isLoading: boolean;
    forcedLoading: boolean;
}

const initialState: LoaderState = {
    isLoading: false,
    forcedLoading: false,
};

export const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        loading(state, action: PayloadAction<{ forced: boolean }>) {
            if (action.payload.forced) state.forcedLoading = true;
            else state.isLoading = true;
        },
        loaded(state, action: PayloadAction<{ forced: boolean }>) {
            if (action.payload.forced) state.forcedLoading = false;
            else state.isLoading = false;
        },
    },
});

export const { loading, loaded } = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;
