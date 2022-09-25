import { Navigate } from 'react-router-dom';
import { UserAuth } from '~/context/AuthContext';

function Protected({ children }) {
    const { user } = UserAuth();
    console.log('user: ', user);

    if (user) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }

    return children;
}

export default Protected;
