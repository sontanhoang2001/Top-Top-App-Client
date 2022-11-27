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
        dialogSettingVideo: (state, action) => {
            state.dialogStatus = action.payload.dialogStatus;
            state.dialogName = "settingVideo";
            state.videoId = action.payload.videoId;
        },
        closeDialog: (state) => {
            state.dialogStatus = false;
        }
    },
});

export const { dialogComment, dialogShare, dialogCommentLock, dialogSettingVideo, closeDialog } = dialogSlice.actions;

export const selectDialogStatus = (state) => state.dialog.dialogStatus;
export const selectDialogName = (state) => state.dialog.dialogName;
export const selectVideoId = (state) => state.dialog.videoId;

export default dialogSlice.reducer;
