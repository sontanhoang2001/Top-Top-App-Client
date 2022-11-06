import { createSlice } from '@reduxjs/toolkit';

export const videoSlice = createSlice({
    name: 'video',
    initialState: {
        videoId: null,
    },
    reducers: {
        setVideoId: (state, action) => {
            state.videoId = action.payload.videoId;
        },
    },
});

export const { setVideoId } = videoSlice.actions;

export const selectVideoId = (state) => state.video.videoId;

export default videoSlice.reducer;
