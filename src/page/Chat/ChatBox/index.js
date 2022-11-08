import './ChatBox.scss'
import { memo, useEffect, useMemo, useState } from 'react';

import EmojiPicker from 'emoji-picker-react';

import { SentimentVerySatisfied, MicNone, Send, Image as ImageIcon } from '@mui/icons-material';
import { styled, Avatar, Box, Card, CardHeader, TextField, Badge, Button, Chip, IconButton } from '@mui/material';
import Message from '../Message';

// api
import chatApi from '~/api/chat';

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

function ChatBox({ friendInfo, userId, friendId }) {
    console.log("re-render chatbox")

    const [emoji, setEmoji] = useState(false);
    const [messageInput, setMessageInput] = useState();
    const [messages, setMessages] = useState("");

    const getEmpji = (emojiData) => {
        setMessageInput(messageInput + emojiData.emoji);
    }

    const handleSendMessage = () => {
        console.log("message: ", messageInput);
        const requestData = {
            "content": messageInput,
            "senderId": userId,
            "reccive_id": friendId,
            "status": true
        };
        
        chatApi.sendMessage()
            .then(res => {

            })
            .catch(error => {
                console.log();
            })
    }

    useEffect(() => {
        console.log("friendInfo: ", friendInfo)
        chatApi.getFriendMessage(userId, friendId, 1, 10)
            .then(res => {
                setMessages(res.data.data);
            })
            .catch(error => {
                console.log("error: ", error)
            })
    }, [friendId])

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
            <Box className='chatBox' onClick={() => { setEmoji(false) }}>
                {messages && messages.map(({ id, content, status, createdDate, senderUser, recciveUser }, index) =>
                (
                    <>
                        {userId === senderUser.id ? (
                            <>
                                <Box sx={{ margin: '1rem' }}>
                                    <Message message={content} direction="right" />
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box sx={{ margin: '1rem' }}>
                                    <Message message={content} direction="left" />
                                </Box>
                            </>
                        )}
                    </>
                ))}
            </Box>
            {emoji && (
                <Box className="EmojiPicker">
                    <EmojiPicker onEmojiClick={(emojiData) => getEmpji(emojiData)} lazyLoadEmojis={true} />
                </Box>
            )}
            <Box className="footerChat">
                <IconButton onClick={() => { setEmoji(!emoji) }}>
                    <SentimentVerySatisfied />
                </IconButton>
                <ImageIcon />
                <TextField hiddenLabel id="outlined-basic" variant="outlined" sx={{ width: '60%' }} placeholder="Aa" value={messageInput} onChange={(e) => { setMessageInput(e.target.value) }} onClick={() => { setEmoji(false) }} />
                <MicNone />
                <Button variant="contained" endIcon={<Send />} size="large" onClick={handleSendMessage}>
                    Gửi
                </Button>
            </Box>
        </Card>
    </>);
}

export default memo(ChatBox);