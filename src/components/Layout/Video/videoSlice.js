import { createSlice } from '@reduxjs/toolkit';

export const videoSlice = createSlice({
    name: 'video',
    initialState: {
        videoId: null,
        totalVideoPlayed: 0,
        userVideo: null,
        listFollowed: []
    },
    reducers: {
        setVideo: (state, action) => {
            state.videoId = action.payload.videoId;
            const totalVideoPlayed = action.payload.totalVideoPlayed;
            if (totalVideoPlayed > state.totalVideoPlayed) {
                state.totalVideoPlayed = state.totalVideoPlayed + 1;
            }
            state.userVideo = action.payload.userVideo;
        },

    },
});

export const { setVideo } = videoSlice.actions;

export const selectVideoId = (state) => state.video.videoId;
export const selectTotalVideoPlayed = (state) => state.video.totalVideoPlayed;
export const selectUserVideo = (state) => state.video.userVideo;

export default videoSlice.reducer;
