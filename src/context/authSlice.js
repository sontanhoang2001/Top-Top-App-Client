import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loginStatus: false,
        id: null,
        email: "",
        alias: "",
        avatar: "",
        fullName: "",
        history: "",
        createdDate: "",
        role: null,
    },
    reducers: {
        setInfor: (state, action) => {
            state.loginStatus = action.payload.loginStatus;
            state.userId = action.payload.userId;
            state.email = action.payload.email;
            state.alias = action.payload.alias;
            state.avatar = action.payload.avatar;
            state.fullName = action.payload.fullName;
            state.history = action.payload.history;
            state.createdDate = action.payload.createdDate;
            state.role = action.payload.role;
        }
    },
});

export const { setToken, setUserId, setInfor } = authSlice.actions;

export const selectLoginStatus = (state) => state.auth.loginStatus;
export const selectUserId = (state) => state.auth.userId;
export const selectEmail = (state) => state.auth.email;
export const selectAlias = (state) => state.auth.alias;
export const selectAvatar = (state) => state.auth.avatar;
export const selectFullName = (state) => state.auth.fullName;
export const selectHistory = (state) => state.auth.history;
export const selectCreatedDate = (state) => state.auth.createdDate;
export const selectRole = (state) => state.auth.role;



export default authSlice.reducer;
