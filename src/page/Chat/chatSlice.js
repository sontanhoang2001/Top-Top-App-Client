import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        currentImage: 0,
        isViewerOpen: false,
        listImagesViewer: []
    },
    reducers: {
        imageViewer: (state, action) => {
            state.currentImage = action.payload.currentImage;
            state.isViewerOpen = action.payload.isViewerOpen;
        },
        setListImageViewer: (state, action) => {
            state.listImagesViewer = [...state.listImagesViewer, action.payload.listImagesViewer];
        }
    },
});

export const { imageViewer, setListImageViewer } = chatSlice.actions;

export const selectCurrentImage = (state) => state.chat.currentImage;
export const selectIsViewerOpen = (state) => state.chat.isViewerOpen;
export const selectListImagesViewer = (state) => state.chat.listImagesViewer;

export default chatSlice.reducer;
