import { createSlice } from '@reduxjs/toolkit';

interface LoaderState {
    isLoading: boolean;
}

const initialState: LoaderState = {
    isLoading: false,
};

export const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        loading(state) {
            state.isLoading = true;
        },
        loaded(state) {
            state.isLoading = false;
        },
    },
});

export const { loading, loaded } = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;
