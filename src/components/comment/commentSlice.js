import { createSlice } from '@reduxjs/toolkit';

export const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        parentId: null,
        isChildren: false,
        reloadChildrenComment: [null, false] // [childrenId, isLoad]
    },
    reducers: {
        setParentId: (state, action) => {
            state.parentId = action.payload.parentId;
            state.isChildren = action.payload.isChildren;
        },
        setReloadChildrenComment: (state, action) => {
            state.reloadChildrenComment = action.payload.reloadChildrenComment;
        },
    },
});

export const { setParentId, setReloadChildrenComment } = commentSlice.actions;

export const selectParentId = (state) => state.comment.parentId;
export const selectIsChildren = (state) => state.comment.isChildren;
export const selectReloadChildrenComment = (state) => state.comment.reloadChildrenComment;

export default commentSlice.reducer;
