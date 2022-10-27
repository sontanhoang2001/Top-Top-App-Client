import { createSlice } from '@reduxjs/toolkit';

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        enable: false,
        type: '',
        message: '',

    },
    reducers: {
        openSnackbar: (state, action) => {
            state.enable = true;
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
        closeSnackbar: (state) => {
            state.enable = false;
        },
        resetType: (state) => {
            state.type = '';
        }
    },
});

export const { openSnackbar, closeSnackbar, resetType } = snackbarSlice.actions;

export const selectEnable = (state) => state.snackbar.enable;
export const selectType = (state) => state.snackbar.type;
export const selectMessage = (state) => state.snackbar.message;

export default snackbarSlice.reducer;
