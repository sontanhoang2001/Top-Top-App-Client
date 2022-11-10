import './ChatBox.scss'
import { memo, useEffect, useMemo, useRef, useState } from 'react';

import EmojiPicker from 'emoji-picker-react';

import { SentimentVerySatisfied, MicNone, Send, Image as ImageIcon } from '@mui/icons-material';
import { styled, Avatar, Box, Card, CardHeader, TextField, Badge, Button, Chip, IconButton } from '@mui/material';
import Message from '../Message';

// api
import chatApi from '~/api/chat';
import { async } from '@firebase/util';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

function ChatBox({ stompClient, receiveMessage, friendInfo, userId, friendId }) {
    const [emoji, setEmoji] = useState(false);
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState("");
    const [messagesPage, setMessagesPage] = useState(1);

    const messageEl = useRef(null)

    const getEmpji = (emojiData) => {
        setMessageInput(messageInput + emojiData.emoji);
    }

    const handleSendMessage = () => {
        handleCloseEmoji(false);
        if (stompClient) {
            setMessageInput("");
            const chatMessage = {
                "content": messageInput,
                "senderId": userId,
                "reccive_id": friendId,
                "status": true
            };

            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));

            const newMessages =
            {
                content: messageInput,
                status: true,
                createdDate: "",
                senderUser: {
                    id: userId
                }
            };

            setMessages([...messages, newMessages]);
            scrollToBottom();
        }
    }


    useEffect(() => {
        console.log("friendInfo: ", friendInfo)
        chatApi.getFriendMessage(userId, friendId, 1, 15)
            .then(res => {
                // console.log("message thu: ", res.data.data)
                setMessages(res.data.data);
                setMessagesPage(res.data.pageNo)
                console.log("pageNo: ", messagesPage)
            })
            .catch(error => {
                console.log("error: ", error)
            })
    }, [friendId])

    useEffect(() => {
        if (receiveMessage !== "") {
            const { content, senderId } = receiveMessage;
            const newReceiveMessage = { content: content, senderUser: { id: senderId }, createdDate: "" };
            setMessages([...messages, newReceiveMessage]);
        }
    }, [receiveMessage])

    const scrollToBottom = () => {
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }

    const handleLoadOldMessage = async e => {
        let element = e.target;
        if (element.scrollTop === 0) {
            //fetch messages
            console.log("fetch");

            setMessagesPage(messagesPage + 1);
            await chatApi.getFriendMessage(userId, friendId, messagesPage + 1, 15)
                .then(res => {
                    // console.log("message thu: ", res.data.data)
                    const responseOldMessage = res.data.data;
                    console.log("new ")
                    setMessages([...responseOldMessage, ...messages]);
                })
                .catch(error => {
                    console.log("error: ", error)
                })
        }
    }


    const handleCloseEmoji = (value) => {
        setEmoji(value);
    }

    return (<>
        <Card>
            {friendInfo && (
                <CardHeader
                    avatar={
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar aria-label="recipe" src={friendInfo.avatar}></Avatar>
                        </StyledBadge>
                    }
                    title={friendInfo.fullName}
                    subheader="Đang hoạt động"
                />
            )}
            <Box className='chatBox' ref={messageEl} onClick={() => { handleCloseEmoji(false) }} onScroll={handleLoadOldMessage} >
                <ul>
                    {messages && messages.map(({ content, senderUser, createdDate }, index) =>
                    (
                        <li key={index}>
                            {userId === senderUser.id ? (
                                <>
                                    <Box sx={{ margin: '1rem' }}>
                                        <Message message={content} direction="right" />
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Box sx={{ margin: '1rem' }}>
                                        <Message avatarUrl={friendInfo.avatar} message={content} direction="left" />
                                    </Box>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </Box>
            {emoji && (
                <Box className="EmojiPicker">
                    <EmojiPicker onEmojiClick={(emojiData) => getEmpji(emojiData)} lazyLoadEmojis={true} />
                </Box>
            )}
            <Box className="footerChat">
                <IconButton onClick={() => { handleCloseEmoji(!emoji) }}>
                    <SentimentVerySatisfied />
                </IconButton>
                <ImageIcon />
                <TextField hiddenLabel id="outlined-basic" variant="outlined" sx={{ width: '60%' }} placeholder="Aa" value={messageInput} onChange={(e) => { setMessageInput(e.target.value) }} onClick={() => { handleCloseEmoji(false) }} />
                <MicNone />
                <Button variant="contained" endIcon={<Send />} size="large" onClick={handleSendMessage}>
                    Gửi
                </Button>
            </Box>
        </Card>
    </>);
}

export default memo(ChatBox);