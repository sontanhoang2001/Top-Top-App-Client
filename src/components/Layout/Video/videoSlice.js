import { createSlice } from '@reduxjs/toolkit';

export const videoSlice = createSlice({
    name: 'video',
    initialState: {
        videoId: null,
        totalVideoPlayed: 0
    },
    reducers: {
        setVideo: (state, action) => {
            state.videoId = action.payload.videoId;
            const totalVideoPlayed = action.payload.totalVideoPlayed;
            if (totalVideoPlayed >  state.totalVideoPlayed) {
                state.totalVideoPlayed = state.totalVideoPlayed + 1;
            }
        },
    },
});

export const { setVideo } = videoSlice.actions;

export const selectVideoId = (state) => state.video.videoId;
export const selectTotalVideoPlayed = (state) => state.video.totalVideoPlayed;

export default videoSlice.reducer;
