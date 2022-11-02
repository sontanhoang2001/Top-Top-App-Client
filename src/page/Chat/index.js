import { Fragment } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button, Chip, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// component
import NavBar from '~/components/Layout/NavBarHeader'
import ChatBox from './ChatBox'

const messages = [
    {
        id: 1,
        primary: 'Brunch this week?',
        person: '/static/images/avatar/5.jpg',
    },
    {
        id: 2,
        primary: 'Birthday Gift',
        person: '/static/images/avatar/1.jpg',
    },
    {
        id: 3,
        primary: 'Recipe to try',
        person: '/static/images/avatar/2.jpg',
    },
    {
        id: 4,
        primary: 'Yes!',
        person: '/static/images/avatar/3.jpg',
    },
    {
        id: 5,
        primary: "Doctor's Appointment",
        person: '/static/images/avatar/4.jpg',
    },
    {
        id: 6,
        primary: 'Discussion',
        person: '/static/images/avatar/5.jpg',
    },
    {
        id: 7,
        primary: 'Summer BBQ',
        person: '/static/images/avatar/1.jpg',
    },
];

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

export default function Chat() {
    return (
        <Fragment>
            <NavBar back namePage='Tin nhắn của bạn' />
            <CssBaseline />

            <Grid container spacing={2} mt={5}>
                <Grid item md={3}>
                    <List sx={{ mb: 2 }}>
                        {messages.map(({ id, primary, secondary, person }) => (
                            <Fragment key={id}>
                                {id === 1 && (
                                    <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                                        Hôm nay
                                    </ListSubheader>
                                )}

                                {id === 3 && (
                                    <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                                        Hôm qua
                                    </ListSubheader>
                                )}

                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar alt="Profile Picture" src={person} />
                                    </ListItemAvatar>
                                    <ListItemText primary={primary} secondary={secondary} />
                                </ListItem>
                            </Fragment>
                        ))}
                    </List>
                </Grid>
                <Grid item md={9}>
                    <ChatBox />
                    {/* <h1>Hiệp Đinh</h1>
                    <Box>
                        dfgfdgdf
                    </Box>
                    <Box flex >
                        <TextField id="outlined-basic" variant="outlined" sx={{ width: '84%' }} />
                        <Button variant="contained" size="large" endIcon={<SendIcon />} sx={{ ml: 1, mt: '2px' }}>
                            Gửi
                        </Button>
                    </Box> */}


                </Grid>
            </Grid>
            <Paper square sx={{ pb: '50px', mt: '6rem' }}>


            </Paper>
        </Fragment>
    );
}
