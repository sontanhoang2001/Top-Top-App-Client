import { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '~/context/AuthContext';

function Login() {
    
    const navigate = useNavigate();
    const { googleSignIn, facebookSignIn, user } = UserAuth();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    const handleFacebookSignIn = async () => {
        try {
            await facebookSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     if (user) {
    //         console.log('user: ', user);
    //         const { displayName, email } = user;
    //         console.log(`Data: name: ${displayName}, email: ${email}`);

    //         navigate('/profile');
    //     }
    // }, [user]);

    return (
        <>
            <h1>Sign in</h1>
            <GoogleButton onClick={handleGoogleSignIn} />
            <GoogleButton onClick={handleFacebookSignIn} />
        </>
    );
}

export default Login;
