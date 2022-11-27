import classNames from 'classnames/bind';
// import styles from './Header.module.scss';
// import   './Header.css';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

//drawer elements used
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';

import TabPanel from '~/components/TabPanel';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';
import { Avatar, Badge, CardHeader, Tab, Tabs } from '@mui/material';
import propTypes from 'prop-types';

import HoverVideoPlayer from 'react-hover-video-player';
import VideoThumbnail from 'react-video-thumbnail'; // use npm published version

// api
import videoApi from '~/api/video';
import accountApi from '~/api/account';

import { Link, useLocation } from 'react-router-dom';

const StyledSearch = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


//search as JSX
// const search = (
//     <StyledSearch>
//         <SearchIconWrapper>
//             <SearchIcon />
//         </SearchIconWrapper>
//         <StyledInputBase placeholder="Tìm kiếm..." inputProps={{ 'aria-label': 'search' }} />
//     </StyledSearch>
// );


TabPanel.propTypes = {
    children: propTypes.node,
    index: propTypes.number.isRequired,
    value: propTypes.number.isRequired,
};


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const theme = createTheme({
    components: {
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    padding: '16px 16px 16px 0px'
                }
            }
        }
    }
});

function Header() {
    const location = useLocation();
    const pathName = location.pathname;

    // START HAMBURGER MENU NAVIGATION
    //react useState hook to save the current open/close state of the drawer, normally variables dissapear afte the function was executed
    const [open, setState] = useState(false);

    //function that is being called every time the drawer should open or close, the keys tab and shift are excluded so the user can focus between the elements with the keys
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        //changes the function state according to the value of open
        setState(open);
    };
    // END HAMBURGER MENU NAVIGATION

    const [videoResult, setVideoResult] = useState();
    const [userResult, setUserResult] = useState();
    const [search, setSearch] = useState("");
    const [tabMenu, setTabMenu] = useState(0);

    const handleChange = (event, newValue) => {
        setTabMenu(newValue);
    };

    useEffect(() => {
        if (tabMenu == 0) {
            videoApi.searchVideo(1, 10, search)
                .then(res => {
                    setVideoResult(res.data.data);
                })
                .catch(error => console.log(error));
        } else {
            accountApi.searchUser(search)
                .then(res => {
                    setUserResult(res.data.data);
                })
                .catch(error => console.log(error));
        }
    }, [search, tabMenu])

    // auto close search bar
    // khi thấy sự thay đổi của 
    useEffect(() => {
        setState(false);
    }, [pathName])


    return (<>
        <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Container maxWidth="xl">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        size="large"
                        onClick={toggleDrawer(true)}
                        sx={{
                            mr: 2,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* The outside of the drawer */}
                    <Drawer
                        //from which side the drawer slides in
                        anchor="left"
                        //if open is true --> drawer is shown
                        open={open}
                        //function that is called when the drawer should close
                        onClose={toggleDrawer(false)}

                    >
                        {/* The inside of the drawer */}
                        <Box
                            sx={{
                                width: '340px',
                                p: 2,
                                // height: 1,
                                // backgroundColor: '#dbc8ff',
                            }}
                        >
                            {/* when clicking the icon it calls the function toggleDrawer and closes the drawer by setting the variable open to false */}
                            <IconButton sx={{ mb: 2 }} onClick={toggleDrawer(false)} >
                                <CloseIcon />
                            </IconButton>

                            <Divider sx={{ mb: 2 }} />

                            <StyledSearch>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase placeholder="Tìm kiếm..." inputProps={{ 'aria-label': 'search' }} value={search} onChange={(e) => setSearch(e.target.value)} />
                            </StyledSearch>

                            <Box sx={{ marginTop: '8px' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={tabMenu} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="Video" {...a11yProps(0)} />
                                        <Tab label="Tài khoản" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={tabMenu} index={0}>
                                    <Box sx={{ marginRight: 0.5, mb: 2, cursor: 'pointer' }} >
                                        {videoResult && videoResult.map(({ id, title, url, avatar, view, user }) => (
                                            <Box key={id} mb={3}>
                                                <Link to={`/${id}`}>
                                                    <HoverVideoPlayer
                                                        videoSrc={url}
                                                        pausedOverlay={
                                                            <VideoThumbnail
                                                                videoUrl={url}
                                                                thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                                                                height={80}
                                                            />
                                                        }
                                                        loadingOverlay={
                                                            <div className="loading-overlay">
                                                                <div className="loading-spinner" />
                                                            </div>
                                                        }
                                                    />
                                                </Link>

                                                <Box sx={{ pr: 2, mt: 1 }}>
                                                    <Link className='link' to={`/${id}`}>
                                                        <Typography gutterBottom variant="body2">{title}</Typography>
                                                    </Link>

                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            <Link className='link' to={`/@${user.alias}`}>
                                                                <Avatar sx={{ width: 20, height: 20 }} aria-label="recipe" src={user.avatar} >
                                                                    {user.fullName[0]}
                                                                </Avatar>
                                                            </Link>
                                                            <Link className='link' to={`/@${user.alias}`}>
                                                                <Typography variant="caption" color="text.secondary" ml={1}>
                                                                    {user.fullName}
                                                                </Typography>
                                                            </Link>
                                                        </Box>
                                                        <Typography variant="caption" color="text.secondary" sx={{ cursor: 'default' }} >
                                                            {`${view} lượt xem`}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Divider sx={{ my: 2 }} />
                                            </Box>

                                        ))}
                                    </Box>
                                </TabPanel>
                                <TabPanel value={tabMenu} index={1}>
                                    <Box sx={{ cursor: 'pointer' }}>
                                        {userResult && userResult.map(({ fullName, alias, avatar }) => (
                                            <ThemeProvider theme={theme}>
                                                <Link to={`@${alias}`} className='link' >
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar sx={{ width: 50, height: 50 }} aria-label="recipe" src={avatar} >
                                                                {fullName[0]}
                                                            </Avatar>
                                                        }
                                                        title={fullName}
                                                        subheader={`@${alias}`}
                                                    />
                                                </Link>
                                            </ThemeProvider>
                                        ))}
                                    </Box>
                                </TabPanel>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '50%',
                                    transform: 'translate(-50%, 0)',
                                }}
                            ></Box>
                        </Box>
                    </Drawer>
                </Toolbar>
            </Container>
        </AppBar>
    </>);
}

export default Header;