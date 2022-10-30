import { Navigate } from 'react-router-dom';
import { UserAuth } from '~/context/AuthContext';

function Protected({ children }) {
    const { userInfo } = UserAuth();

    if (userInfo) {
        return <Navigate to="/404" />;
    } else {
        return children;
    }
}

export default Protected;
