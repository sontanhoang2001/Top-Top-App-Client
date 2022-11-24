import { useContext, createContext, useEffect, useState } from 'react';
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '~/firebase/config';

import jwtDecode from "jwt-decode";

// redux
import { useDispatch } from 'react-redux';
import { openSnackbar } from "~/components/customizedSnackbars/snackbarSlice";

// api
import authApi from '../api/auth'
import profileApi from '../api/profile'

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    const [user, setUser] = useState(false);
    // const [userInfo, setUserInfo] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);

    // đóng vai trò tạm khi đăng ký
    const [userTempId, setUserTempId] = useState(false);

    // <======= START LOGIN  =======>
    const login = async (email, password) => {
        let snackBarPayload = {};
        const resquest = { "username": email, "password": password };

        await authApi.login(resquest)
            .then(res => {
                // save token in localStorage
                const token = res.data.access_token;
                window.localStorage.setItem("token", token);
                window.location = "/";
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 403) {
                        snackBarPayload = { type: 'error', message: 'Tài khoản hoặc mật khẩu chưa đúng!' };
                    } else {
                        snackBarPayload = { type: 'error', message: 'Đăng nhập không thành công!' };
                    }
                } else {
                    snackBarPayload = { type: 'error', message: 'Đã xảy ra sự cố!' };
                    console.log('Error', error.message);
                }
                console.log("error login: ", error)

            });
        dispatch(openSnackbar(snackBarPayload))
    };

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const facebookSignIn = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider);
    };

    const logOut = () => {
        try {
            signOut(auth);
            window.localStorage.setItem("token", null);
            window.localStorage.setItem("socialRegister", null);
            window.location = "/login";
        } catch (error) {
            console.log(error)
        }
    };

    // <======= END LOGIN  =======>

    // Khi thay đổi user thì get thông tin profile
    useEffect(() => {
        // Kiểm tra thông tin đăng nhập
        checkAuthInfo();
    }, [])

    const checkAuthInfo = async () => {
        const authenInfor = window.localStorage?.getItem("token");
        if (authenInfor !== null) {
            try {
                const jwtDecoded = jwtDecode(authenInfor);
                const email = jwtDecoded.sub;
                await profileApi.getProfile(email)
                    .then(res => {
                        // setUser({ uid: res.data.id, email: res.data.email, role: res.data.role.id });
                        setLoginStatus(true);
                        const payload = {
                            loginStatus: true,
                            id: res.data.id,
                            email: res.data.email,
                            alias: res.data.alias,
                            avatar: res.data.avatar,
                            fullName: res.data.fullName,
                            history: res.data.history,
                            createdDate: res.data.createdDate,
                            role: res.data.role.id
                        };
                        console.log("get profile: ", payload);
                        setUser(payload);

                        // setUserInfo(payload);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <AuthContext.Provider value={{ login, googleSignIn, facebookSignIn, logOut, user, userTempId, setUserTempId, loginStatus }}>{children}</AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
