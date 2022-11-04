import { createSlice } from '@reduxjs/toolkit';

export const dialogSlice = createSlice({
    name: 'dialog',
    initialState: {
        dialogStatus: false,
        dialogName: "",
        dialogId: ""
    },
    reducers: {
        dialogShare: (state, action) => {
            state.dialogStatus = action.payload.dialogStatus;
            state.dialogName = "share";
            state.dialogId = action.payload.dialogId;
        },
        dialogComment: (state, action) => {
            state.dialogStatus = action.payload.dialogStatus;
            state.dialogName = "comment";
            state.dialogId = action.payload.dialogId;
        },
        closeDialog: (state) => {
            state.dialogStatus = false;
        }
    },
});

export const { dialogComment, dialogShare, closeDialog } = dialogSlice.actions;

export const selectDialogStatus = (state) => state.dialog.dialogStatus;
export const selectDialogName = (state) => state.dialog.dialogName;
export const selectDialogId = (state) => state.dialog.dialogId;

export default dialogSlice.reducer;
