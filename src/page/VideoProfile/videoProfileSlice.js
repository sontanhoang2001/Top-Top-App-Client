import { createSlice } from '@reduxjs/toolkit';

export const videoProfileSlice = createSlice({
    name: 'videoProfile',
    initialState: {
        enableComment: null,
        professed: null,
    },
    reducers: {
        setVideoSetting: (state, action) => {
            state.enableComment = action.payload.enableComment;
            state.professed = action.payload.professed;
        },
    },
});

export const { setVideoSetting } = videoProfileSlice.actions;

export const selectEnableComment = (state) => state.videoProfile.enableComment;
export const selectProfessed = (state) => state.videoProfile.professed;

export default videoProfileSlice.reducer;
