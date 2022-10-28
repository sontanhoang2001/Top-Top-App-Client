import { createSlice } from '@reduxjs/toolkit';

export const currentPageSlice = createSlice({
    name: 'currentPage',
    initialState: {
        value: 'home',
        direction: "/"
    },
    reducers: {
        currentPath: (state, action) => {
            state.value = action.payload;
        },
        setDirection: (state, action) => {
            state.direction = action.payload.direction;
        },
    }
});

export const { currentPath, setDirection } = currentPageSlice.actions;

export const selectCurrentPage = (state) => state.currentPage.value;
export const selectDirection = (state) => state.currentPage.direction;

export default currentPageSlice.reducer;