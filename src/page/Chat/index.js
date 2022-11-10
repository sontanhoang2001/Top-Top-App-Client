import './Chat.scss';

import { Fragment, memo, useEffect, useRef, useState } from 'react';
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

// api
import chatApi from '~/api/chat';

// provider
import { UserAuth } from '~/context/AuthContext';
import { Socket } from '~/context/SocketContext';

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
    {
        id: 8,
        primary: 'Summer BBQ',
        person: '/static/images/avatar/1.jpg',
    },
    {
        id: 9,
        primary: 'Summer BBQ',
        person: '/static/images/avatar/1.jpg',
    },
    {
        id: 10,
        primary: 'Summer BBQ',
        person: '/static/images/avatar/1.jpg',
    },
    {
        id: 11,
        primary: 'Summer BBQ',
        person: '/static/images/avatar/1.jpg',
    },
    {
        id: 12,
        primary: 'Summer BBQ',
        person: '/static/images/avatar/1.jpg',
    },
    {
        id: 13,
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


function Chat() {
    const { user } = UserAuth();
    const { stompClient, privateMessage } = Socket();

    const [friend, setFriend] = useState();
    const [friendId, setFriendId] = useState();
    const [friendInfo, setFriendInfo] = useState();

    useEffect(() => {
        if (user) {
            chatApi.getAllFriends(user.id)
                .then(res => {
                    setFriend(res.data);

                    setFriendId(res.data[0].id);
                    setFriendInfo(res.data[0]);
                })
                .catch(error => {
                    console.log("error: ", error)
                })
        }
    }, [user])

    const handleLoadMessage = (id, index) => {
        setFriendId(id);
        setFriendInfo(friend[index]);
    }

    return (
        <Fragment>
            <NavBar back namePage='Tin nhắn của bạn' />
            <CssBaseline />

            <Grid container spacing={2} mt={3} alignItems="center">
                <Grid item xs={12} md={3}>
                    <List sx={{ mb: 2 }} className='listFriend'>
                        <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                            Danh sách bạn bè
                        </ListSubheader>
                        {friend && friend.map(({ id, fullName, avatar }, index) => (
                            <Fragment key={id}>
                                {/* {id === 1 && (
                                    <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                                        Hôm nay
                                    </ListSubheader>
                                )}

                                {id === 3 && (
                                    <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                                        Hôm qua
                                    </ListSubheader>
                                )} */}


                                <ListItem button onClick={() => handleLoadMessage(id, index)}>
                                    <ListItemAvatar>
                                        <Avatar alt="Profile Picture" src={avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={fullName} />
                                </ListItem>
                            </Fragment>
                        ))}
                    </List>
                </Grid>

                {user && (
                    <Grid item xs={12} md={9}>
                        <ChatBox stompClient={stompClient} receiveMessage={privateMessage} friendInfo={friendInfo} userId={user.id} friendId={friendId} />
                    </Grid>
                )}
            </Grid>
        </Fragment>
    );
}

export default memo(Chat)