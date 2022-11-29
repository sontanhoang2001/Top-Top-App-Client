import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserAuth } from '~/context/AuthContext';

function ProtectedLogin({ children }) {
    const navigate = useNavigate();
    const { loginStatus, user } = UserAuth();
    const [isLoaded, setIsLoaded] = useState(false);
    const authenInfor = window.localStorage?.getItem("token");

    useEffect(() => {
        if (authenInfor == 'null') {
            navigate("/login")
        }

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
