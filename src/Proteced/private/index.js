import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '~/context/AuthContext';

function ProtectedPrivate({ children }) {
    const { loginStatus, user } = UserAuth();

    if (loginStatus === true) {
        return <Navigate to="/404" />;
    } else {
        return children;
    }
}


export default ProtectedPrivate;
