import { createSlice } from '@reduxjs/toolkit';

// Hỗ trợ việc nói trước điều hướng cho trang n* kế tiếp
export const currentPageSlice = createSlice({
    name: 'currentPage',
    initialState: {
        direction: "/"
    },
    reducers: {
        setDirection: (state, action) => {
            state.direction = action.payload.direction;
        },
    }
});

export const { setDirection } = currentPageSlice.actions;

export const selectDirection = (state) => state.currentPage.direction;

export default currentPageSlice.reducer;