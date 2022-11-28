import './Chat.scss';

import { Fragment, memo, useEffect, useRef, useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
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
import { Button, Chip, Grid, InputBase, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// component
import ChatBox from './ChatBox'

// api
import chatApi from '~/api/chat';

// provider
import { UserAuth } from '~/context/AuthContext';

import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useNavigate, useParams } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
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
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

var stompClient = null;

function Chat() {
    const { user } = UserAuth();
    const { chatFriendId } = useParams();
    const navigate = useNavigate();

    const [friendSearch, setFriendSearch] = useState("");
    const [friend, setFriend] = useState();
    const [friendRoot, setFriendRoot] = useState();

    const [friendId, setFriendId] = useState();
    const [friendInfo, setFriendInfo] = useState();
    const [isLoaded, setIsLoaded] = useState(false)

    // connect socket
    const [privateMessage, setPrivateMessage] = useState("");
    const [pendingMessage, setPendingMessage] = useState(false);

    const connect = () => {
        let Sock = new SockJS('http://localhost:8081/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        stompClient.subscribe('/user/' + user.id + '/private', onPrivateMessage);

        // đk khi click vào route /chat
        stompClient.subscribe('/user/' + user.id + '/pending', onPendingMessage);
    }

    const onError = (err) => {
        console.log(err);
    }

    // nhận tin nhắn receive messages
    const onPrivateMessage = (payload) => {
        const payloadData = JSON.parse(payload.body);
        setPrivateMessage(payloadData);
    }

    // nhận tin nhắn trạng thái đang soạn tin nhắn
    const onPendingMessage = (payload) => {
        const payloadData = JSON.parse(payload.body);
        setPendingMessage(payloadData);
    }

    useEffect(() => {
        user &&
            connect();
    }, [user])
    // =====================

    // nếu có chatFriendId parameter trên url
    useEffect(() => {
        if (friend)
            if (chatFriendId) {
                setFriendSearch(chatFriendId);
                handleSearchFriend(chatFriendId);
                // load message cho user
                handleLoadMessage(chatFriendId, 0)
            }
    }, [chatFriendId, friend])

    // load danh sách bạn bè
    useEffect(() => {
        if (user) {
            chatApi.getAllFriends(user.id)
                .then(res => {
                    setIsLoaded(true);
                    setFriend(res.data);
                    setFriendRoot(res.data);
                    setFriendId(res.data[0].id);
                    setFriendInfo(res.data[0]);
                })
                .catch(error => {
                    console.log("error: ", error)
                })
        }
    }, [user])

    const handleOnChangeInputSearch = (e) => {
        const keyWord = e.target.value;
        setFriendSearch(keyWord);

        // pháp hiện khi xóa id trên url
        if (chatFriendId) {
            if (keyWord == "")
                navigate("/chat");
        }
        handleSearchFriend(keyWord);
    }

    const handleSearchFriend = (keyWord) => {
        if (keyWord == "") {
            setFriend(friendRoot);
        } else {
            if (!chatFriendId) {
                setFriend(friend.filter(({ fullName }) => fullName.match(new RegExp(keyWord, "i"))));
            } else {
                setFriend(friend.filter(({ id }) => id.match(new RegExp(keyWord, "i"))));
            }
        }
    }

    const handleLoadMessage = (id, index) => {
        setFriendId(id);
        setFriendInfo(friend[index]);
    }

    return (
        <Fragment>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={2} md={3}>
                    <List sx={{ mb: 2 }} className='listFriend'>
                        <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                            Danh sách bạn bè
                        </ListSubheader>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Tìm bạn bè..."
                                inputProps={{ 'aria-label': 'search' }}
                                value={friendSearch}
                                onChange={(e) => handleOnChangeInputSearch(e)}
                            />
                        </Search>
                        {friend && friend.map(({ id, fullName, avatar }, index) => {
                            return (
                                <Fragment key={id}>
                                    <ListItem button onClick={() => handleLoadMessage(id, index)}>
                                        <ListItemAvatar>
                                            <Avatar alt="Profile Picture" src={avatar} />
                                        </ListItemAvatar>
                                        <ListItemText primary={fullName} />
                                    </ListItem>
                                </Fragment>
                            )
                        })}
                    </List>
                </Grid>

                {user && (
                    <Grid item xs={10} md={9}>
                        <ChatBox stompClient={stompClient} receiveMessage={privateMessage} pendingMessage={pendingMessage} friendInfo={friendInfo} userId={user.id} friendId={friendId} />
                    </Grid>
                )}
            </Grid>
        </Fragment>
    );
}

export default memo(Chat)