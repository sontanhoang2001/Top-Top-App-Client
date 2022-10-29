import { Navigate } from 'react-router-dom';
import { UserAuth } from '~/context/AuthContext';

function Protected({ children }) {
    const { user } = UserAuth();
    const authenInfor = window.localStorage?.getItem("token");

    if (user) {
        return <Navigate to="/404" />;
    } else {
        return children;
    }
}

export default Protected;
