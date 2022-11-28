import { createSlice } from '@reduxjs/toolkit';

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState: {
        dialogStatus: false,
        dialogName: "",
        videoId: "",
    },
    reducers: {
        dialogShare: (state, action) => {
            state.dialogStatus = action.payload.dialogStatus;
            state.dialogName = "share";
            state.videoId = action.payload.videoId;
        },
        dialogComment: (state, action) => {
            state.dialogStatus = true;
            state.dialogName = "comment";
            state.videoId = action.payload.videoId;
        },
        dialogCommentLock: (state) => {
            state.dialogStatus = true;
            state.dialogName = "commentLock";
        },
        dialogOptionVideo: (state, action) => {
            state.dialogStatus = true;
            state.dialogName = "optionVideo";
            state.videoId = action.payload.videoId;
        },
        dialogDeleteVideo: (state, action) => {
            state.dialogStatus = true;
            state.dialogName = "deleteVideo";
            state.videoId = action.payload.videoId;
        },
        dialogReportVideo: (state, action) => {
            state.dialogStatus = true;
            state.dialogName = "reportVideo";
            state.videoId = action.payload.videoId;
        },
        closeDialog: (state) => {
            state.dialogStatus = false;
        }
    },
});

export const { dialogComment, dialogShare, dialogCommentLock, dialogOptionVideo, dialogDeleteVideo, dialogReportVideo, closeDialog } = dialogSlice.actions;

export const selectDialogStatus = (state) => state.dialog.dialogStatus;
export const selectDialogName = (state) => state.dialog.dialogName;
export const selectVideoId = (state) => state.dialog.videoId;

export default dialogSlice.reducer;
