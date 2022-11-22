import { createSlice } from '@reduxjs/toolkit';

export const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        parentId: null,
        replyUser: null,
        isChildren: false,
        reloadChildrenComment: [null, false] // [childrenId, isLoad]
        ,
        totalComment: 0
    },
    reducers: {
        setReply: (state, action) => {
            state.parentId = action.payload.parentId;
            state.replyUser = action.payload.replyUser;
            state.isChildren = action.payload.isChildren;
        },
        setReloadChildrenComment: (state, action) => {
            state.reloadChildrenComment = action.payload.reloadChildrenComment;
        },
        setTotalComment: (state, action) => {
            state.totalComment = action.payload.totalComment;
        },
    },
});

export const { setReply, setReloadChildrenComment, setTotalComment } = commentSlice.actions;

export const selectParentId = (state) => state.comment.parentId;
export const selectReplyUser = (state) => state.comment.replyUser;
export const selectIsChildren = (state) => state.comment.isChildren;
export const selectReloadChildrenComment = (state) => state.comment.reloadChildrenComment;
export const selectTotalComment = (state) => state.comment.totalComment;

export default commentSlice.reducer;
