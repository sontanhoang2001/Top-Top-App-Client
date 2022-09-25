import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    const { googleSignIn, facebookSignIn, user, logOut } = UserAuth();

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

    const handleSignOut = async () => {
        try {
            await logOut();
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
            <header className={cx('wrapper')}>
                <div className="float-right">
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/following">Following</Link>
                        </li>
                        <li>
                            <Link to="/counter">Counter</Link>
                        </li>
                        <li>
                            <Link to="/@">Profile</Link>
                        </li>
                    </ul>
                </div>
            </header>
            {user == null ? (
                <>
                    <h1>Sign in</h1>
                    <GoogleButton onClick={handleGoogleSignIn} />
                    <GoogleButton onClick={handleFacebookSignIn} />
                </>
            ) : (
                <>
                    <p>Welcome, {user?.displayName}</p>
                    <button onClick={handleSignOut}>Logout</button>
                </>
            )}
        </>
    );
}

export default Header;
