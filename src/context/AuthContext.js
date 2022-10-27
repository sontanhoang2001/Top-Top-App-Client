import { useNavigate } from 'react-router-dom';
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
import { setInfor } from "./authSlice";

// api
import authApi from '../api/auth'
import profileApi from '../api/profile'

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        uid: false,
        role: false,
    });

    const [uid, setUid] = useState(false);
    const [role, setRole] = useState(false);

    // <======= START LOGIN  =======>
    const login = async (email, password) => {
        let snackBarPayload = {};
        const resquest = { "username": email, "password": password };

        await authApi.login(resquest)
            .then(res => {
                console.log("login: ", res.data)
                // save token in localStorage
                const token = res.data.access_token;
                window.localStorage.setItem("token", token);
                // window.location = "/home";
                // navigate("/home")
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

    }, [uid])

    const checkAuthInfo = async () => {
        const authenInfor = window.localStorage?.getItem("token");
        if (authenInfor !== null) {
            try {
                const jwtDecoded = jwtDecode(authenInfor);
                const email = jwtDecoded.sub;
                await profileApi.getProfile(email)
                    .then(res => {
                        setUid(res.data.id)

                        console.log("check auth", res.data)

                        const payload = { loginStatus: true, userId: res.data.id, role: res.data.role, fullName: res.data.fullName, avatar: res.data.avatar }
                        dispatch(setInfor(payload))
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsubcribe();
        };
    }, [uid]);

    return (
        <AuthContext.Provider value={{ login, googleSignIn, facebookSignIn, logOut, user }}>{children}</AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
