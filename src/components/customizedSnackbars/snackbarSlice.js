import { createSlice } from '@reduxjs/toolkit';

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        enable: false,
        type: '',
        message: '',
        duration: 3000,
    },
    reducers: {
        openSnackbar: (state, action) => {
            state.enable = true;
            state.type = action.payload.type;
            state.message = action.payload.message;
            if (action.payload.duration)
                state.duration = action.payload.duration;
        },
        closeSnackbar: (state) => {
            state.enable = false;
        },
        resetType: (state) => {
            state.type = '';
        },
        resetDuration: (state) => {
            state.duration = 3000;
        }
    },
});

export const { openSnackbar, closeSnackbar, resetType, resetDuration } = snackbarSlice.actions;

export const selectEnable = (state) => state.snackbar.enable;
export const selectType = (state) => state.snackbar.type;
export const selectMessage = (state) => state.snackbar.message;
export const selectDuration = (state) => state.snackbar.duration;


export default snackbarSlice.reducer;
