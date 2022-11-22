import { createSlice } from '@reduxjs/toolkit';

// Hỗ trợ việc nói trước điều hướng cho trang n* kế tiếp
export const currentPageSlice = createSlice({
    name: 'currentPage',
    initialState: {
        direction: "/",
        videoIdParam: null
    },
    reducers: {
        setDirection: (state, action) => {
            state.direction = action.payload.direction;
        },
        setVideoIdParam: (state, action) => {
            state.videoIdParam = action.payload.videoIdParam;
        }
    }
});

export const { setDirection, setVideoIdParam } = currentPageSlice.actions;

export const selectDirection = (state) => state.currentPage.direction;
export const selectVideoIdParam = (state) => state.currentPage.videoIdParam;

export default currentPageSlice.reducer;