import { createSlice } from '@reduxjs/toolkit';

export const currentPageSlice = createSlice({
    name: 'currentPage',
    initialState: {
        value: 'home',
    },
    reducers: {
        currentPath: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { currentPath } = currentPageSlice.actions;

export const selectCurrentPage = (state) => state.currentPage.value;

export default currentPageSlice.reducer;
