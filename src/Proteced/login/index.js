import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '~/context/AuthContext';

function ProtectedLogin({ children }) {
    const { loginStatus, user } = UserAuth();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (loginStatus) {
            setIsLoaded(true);
        }
    }, [loginStatus])

    if (isLoaded)
        if (!user) {
            return <Navigate to="/login" />;
        } else {
            return children;
        }
}


export default ProtectedLogin;
