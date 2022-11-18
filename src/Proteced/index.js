import { Navigate } from 'react-router-dom';
import { UserAuth } from '~/context/AuthContext';

function Protected({ children }) {
    const { loginStatus } = UserAuth();

    if (loginStatus) {
        return <Navigate to="/404" />;
    } else {
        return children;
    }
}


export default Protected;
