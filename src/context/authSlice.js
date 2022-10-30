import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loginStatus: false
    },
    reducers: {
        setInfor: (state, action) => {
            state.loginStatus = action.payload.loginStatus;
        }
    },
});

export const { setToken, setUserId, setInfor } = authSlice.actions;

export const selectLoginStatus = (state) => state.auth.loginStatus;




export default authSlice.reducer;
