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

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState();

    // <======= START LOGIN  =======>
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const facebookSignIn = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider);
    };
    // <======= END LOGIN  =======>

    const logOut = () => {
        signOut(auth);
    };

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsubcribe();
        };
    }, [user]);

    
    return (
        <AuthContext.Provider value={{ googleSignIn, facebookSignIn, logOut, user }}>{children}</AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
