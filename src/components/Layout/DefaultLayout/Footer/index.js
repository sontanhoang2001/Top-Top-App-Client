import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import HomeIcon from '@mui/icons-material/Home';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { Button, useMediaQuery } from '@mui/material';

// auth provider
import { UserAuth } from '~/context/AuthContext';

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
    const { loginStatus, user } = UserAuth();
    const pathProfile = `/@${user.alias}`;
    const location = useLocation();
    const pathName = location.pathname;

    // START HEADER
    const [page, setPage] = useState('');
    useEffect(() => {
        switch (pathName) {
            case '/':
                setPage('home');
                break;
            case '/home':
                setPage('home');
                break;
            case '/chat':
                setPage('chat');
                break;
            case '/upload':
                setPage('upload');
                break;
            case '/notification':
                setPage('notification');
                break;
            case '/profile':
                setPage('profile');
                break;
            case pathProfile:
                setPage('profile');
                break;
            default:
                setPage('/');
        }

    }, [location]);

    const handleChange = (event, newPage) => {
        setPage(newPage);
    };
    // END HEADER


    // START HAMBURGER MENU NAVIGATION
    //react useState hook to save the current open/close state of the drawer, normally variables dissapear afte the function was executed
    const [open, setState] = useState(false);

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
                        label="Trang Chủ"
                        value="home"
                        icon={<HomeIcon fontSize={matchesSM ? 'large' : 'medium'} />}
                        className={cx(page == 'home' ? 'btnNav__light' : null)}
                    />
                    <BottomNavigationAction
                        component={Link}
                        to="/chat"
                        label="Tin Nhắn"
                        value="chat"
                        icon={<ChatBubbleIcon fontSize={matchesSM ? 'large' : 'medium'} />}
                        className={cx(page == 'home' ? 'btnNav__light' : null)}
                    />
                    <BottomNavigationAction />
                    <BottomNavigationAction
                        component={Link}
                        to="/upload"
                        value="upload"
                        icon={<AddIcon fontSize={matchesSM ? 'large' : 'medium'} />}
                        className={cx('btnVideo', page == 'home' ? 'btnNav__light' : 'btnVideo__Active')}
                    />
                    <BottomNavigationAction
                        component={Link}
                        to="/notification"
                        label="Thông báo"
                        value="notification"
                        icon={<NotificationsActiveIcon fontSize={matchesSM ? 'large' : 'medium'} />}
                        className={cx(page == 'home' ? 'btnNav__light' : null)}
                    />
                    <BottomNavigationAction
                        component={Link}
                        to={loginStatus === true ? pathProfile : "/profile"}
                        label="Cá Nhân"
                        value="profile"
                        icon={<PersonIcon fontSize={matchesSM ? 'large' : 'medium'} />}
                        className={cx(page == 'home' ? 'btnNav__light' : null)}
                    />
                </BottomNavigation>
            </ThemeProvider>
        </>
    );
}

export default Footer;
