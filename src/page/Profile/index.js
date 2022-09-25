import { useEffect } from 'react';
import { UserAuth } from '~/context/AuthContext';

function Profile() {
    const { user, logOut } = UserAuth();

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1>Account</h1>
            <p>Welcome, {user?.displayName}</p>
            <button onClick={handleSignOut}>Logout</button>
        </>
    );
}

export default Profile;
