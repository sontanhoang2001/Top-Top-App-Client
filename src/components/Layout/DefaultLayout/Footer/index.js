import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '~/context/AuthContext';

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonIcon from '@mui/icons-material/Person';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { currentPath } from '../../../../router/routerPathSlice';

const cx = classNames.bind(styles);

// styleOverrides
const theme = createTheme({
    palette: {
        btnNavAction: {
            backGroundColor: 'red',
            position: 'fixed',
            zIndex: '999',
            width: '100%',
            height: '65px',
            bottom: '0px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
            justifyContent: 'space-between'
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: (themeParam) => `
            .btnNavAction {
            ${themeParam.palette.btnNavAction};
          }
        `,
        },
    },
});

function Footer() {
    const dispatch = useDispatch();

    // START HEADER
    const [page, setPage] = React.useState('');
    React.useEffect(() => {
        const pathName = window.location.pathname.split('/')[1];
        // console.log('current Pathname 👉️', pathName);
        switch (pathName) {
            case '':
                setPage('home');
                break;
            case 'home':
                setPage('home');
                break;
            case 'search':
                setPage('search');
                break;
            case 'upload':
                setPage('upload');
                break;
            case 'chat':
                setPage('chat');
                break;
            case '@':
                setPage('profile');
                break;
            default:
                setPage(window.location.pathname.split('/')[1]);
        }

        dispatch(currentPath(pathName))
    });

    const handleChange = (event, newPage) => {
        setPage(newPage);
    };
    // END HEADER

    // START HAMBURGER MENU NAVIGATION
    //react useState hook to save the current open/close state of the drawer, normally variables dissapear afte the function was executed
    const [open, setState] = React.useState(false);

    //function that is being called every time the drawer should open or close, the keys tab and shift are excluded so the user can focus between the elements with the keys
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        //changes the function state according to the value of open
        setState(open);
    };
    // END HAMBURGER MENU NAVIGATION

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

    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <>
            <ThemeProvider theme={theme}>
                <BottomNavigation
                    showLabels
                    value={page}
                    onChange={handleChange}
                    className={cx('btnNavAction', page == 'home' ? 'dark' : null)}
                >
                    <BottomNavigationAction
                        component={Link}
                        to="/home"
                        label="Home"
                        value="home"
                        icon={<HomeIcon fontSize={matchesSM ? 'large' : 'medium'} />}
                        className={cx(page == 'home' ? 'btnNav__light' : null)}
                    />
                    <BottomNavigationAction
                        component={Link}
                        to="/search"
                        label="Search"
                        value="search"
                        icon={<SearchIcon fontSize={matchesSM ? 'large' : 'medium'} />}
                        className={cx(page == 'home' ? 'btnNav__light' : null)}
                    />
                    <BottomNavigationAction
                        component={Link}
                        to="/upload"
                        label="Upload"
                        value="upload"
                        icon={<VideoCallIcon fontSize={matchesSM ? 'large' : 'medium'} />}
                        className={cx(page == 'home' ? 'btnNav__light' : null)}
                    />
                    <BottomNavigationAction
                        component={Link}
                        to="/chat"
                        label="Chat"
                        value="chat"
                        icon={<ChatBubbleIcon fontSize={matchesSM ? 'large' : 'medium'} />}
                        className={cx(page == 'home' ? 'btnNav__light' : null)}
                    />
                    <BottomNavigationAction
                        component={Link}
                        to="/@"
                        label="Profile"
                        value="profile"
                        icon={<PersonIcon fontSize={matchesSM ? 'large' : 'medium'} />}
                        className={cx(page == 'home' ? 'btnNav__light' : null)}
                    />
                </BottomNavigation>
            </ThemeProvider>

            {/* <header className={cx('wrapper')}>
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
            )} */}
        </>
    );
}

export default Footer;
