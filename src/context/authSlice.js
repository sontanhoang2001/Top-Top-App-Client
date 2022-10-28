import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loginStatus: false,
        userId: null,
        accessToken: null,
        role: "",
        fullName: "",
        avatar: ""
    },
    reducers: {
        setToken: (state, action) => {
            state.accessToken = action.payload.accessToken;
        },
        setUserId: (state, action) => {
            state.userId = action.payload.userId;
        },
        setInfor: (state, action) => {
            state.loginStatus = action.payload.loginStatus;
            state.userId = action.payload.userId;
            state.role = action.payload.role;
            state.fullName = action.payload.fullName;
            state.avatar = action.payload.avatar;
        }
    },
});

export const { setToken, setUserId, setInfor } = authSlice.actions;

export const selectToken = (state) => state.auth.accessToken;
export const selectLoginStatus = (state) => state.auth.loginStatus;
export const selectUserId = (state) => state.auth.userId;
export const selectRole = (state) => state.auth.role;
export const selectFullName = (state) => state.auth.fullName;
export const selectAvatar = (state) => state.auth.avatar;

export default authSlice.reducer;
