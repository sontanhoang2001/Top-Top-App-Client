import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { styled, alpha } from '@mui/material/styles';
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

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PersonIcon from '@mui/icons-material/Person';

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
const search = (
    <StyledSearch>
        <SearchIconWrapper>
            <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Suchen…" inputProps={{ 'aria-label': 'search' }} />
    </StyledSearch>
);

const cx = classNames.bind(styles);

const appBarStyles = styled({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
});

function Header() {
     // START HEADER
     const [value, setValue] = React.useState('');
     React.useEffect(() => {
         const pathName = window.location.pathname.split('/')[1];
         // console.log('current Pathname 👉️', pathName);
         switch (pathName) {
             case '':
                 setValue('home');
                 break;
             case 'home':
                 setValue('home');
                 break;
             case 'search':
                 setValue('search');
                 break;
             case 'upload':
                 setValue('upload');
                 break;
             case 'chat':
                 setValue('chat');
                 break;
             case '@':
                 setValue('profile');
                 break;
             default:
                 setValue(window.location.pathname.split('/')[1]);
         }
     });
 
     const handleChange = (event, newValue) => {
         setValue(newValue);
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
     
    return (<>
        <AppBar position="fixed">
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
                        //function that is called when the drawer should open
                        onOpen={toggleDrawer(true)}
                    >
                        {/* The inside of the drawer */}
                        <Box
                            sx={{
                                p: 2,
                                height: 1,
                                backgroundColor: '#dbc8ff',
                            }}
                        >
                            {/* when clicking the icon it calls the function toggleDrawer and closes the drawer by setting the variable open to false */}
                            <IconButton sx={{ mb: 2 }}>
                                <CloseIcon onClick={toggleDrawer(false)} />
                            </IconButton>

                            <Divider sx={{ mb: 2 }} />

                            <Box sx={{ mb: 2 }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ImageIcon sx={{ color: 'primary.main' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Pictures" />
                                </ListItemButton>

                                <ListItemButton>
                                    <ListItemIcon>
                                        <DescriptionIcon sx={{ color: 'primary.main' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Documents" />
                                </ListItemButton>

                                <ListItemButton>
                                    <ListItemIcon>
                                        <FolderIcon sx={{ color: 'primary.main' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Other" />
                                </ListItemButton>
                            </Box>

                            {search}

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