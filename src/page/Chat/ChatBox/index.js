import './ChatBox.scss'
import { memo, useEffect, useRef, useState } from 'react';

import EmojiPicker from 'emoji-picker-react';

import { SentimentVerySatisfied, MicNone, Send, Image as ImageIcon } from '@mui/icons-material';
import { styled, Avatar, Box, Card, CardHeader, TextField, Badge, Button, Chip, IconButton, CircularProgress, LinearProgress } from '@mui/material';
import Message from '../Message';

import InfiniteScroll from "react-infinite-scroll-component";

// api
import chatApi from '~/api/chat';
import mediaApi from '~/api/media';
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

const initialPageSize = 15;

function ChatBox({ stompClient, receiveMessage, friendInfo, userId, friendId }) {
    const [emoji, setEmoji] = useState(false);
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState("");
    const [messagesPage, setMessagesPage] = useState(1);
    const [totalElements, setTotalElements] = useState();

    const [pageSize, setPageSize] = useState(initialPageSize);
    const [hasMore, setHasMore] = useState(true);

    const messageEl = useRef(null)

    const initialState = () => {
        setMessagesPage(1);
        setPageSize(initialPageSize);
        setHasMore(true);
    }

    useEffect(() => {
        initialState();
        console.log("friendInfo: ", friendInfo)
        chatApi.getFriendMessage(userId, friendId, 1, initialPageSize)
            .then(res => {
                setMessages(res.data.data);
                setMessagesPage(res.data.pageNo)
                setTotalElements(res.data.totalElements)
            })
            .catch(error => {
                console.log("error: ", error)
            })
    }, [friendId])

    useEffect(() => {
        if (receiveMessage !== "") {
            const { content, senderId } = receiveMessage;
            const newReceiveMessage = { content: content, senderUser: { id: senderId }, createdDate: "" };
            setMessages([newReceiveMessage, ...messages]);
            handleScrollToBottom();
        }
    }, [receiveMessage])

    const handleScrollToBottom = () => {
        if (messageEl) {
            // messageEl.current.addEventListener('DOMNodeInserted', event => {
            //     const { currentTarget: target } = event;
            //     target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            // });

            const scroll =
                messageEl.current.scrollHeight -
                messageEl.current.clientHeight;
            messageEl.current.scrollTo(0, scroll);
        }
    }

    const handleCloseEmoji = (value) => {
        setEmoji(value);
    }

    const fetchMoreData = async () => {
        if (pageSize >= totalElements) {
            setHasMore(false);
            return;
        }

        await chatApi.getFriendMessage(userId, friendId, messagesPage + 1, initialPageSize)
            .then(res => {
                const responseOldMessage = res.data.data;
                setMessages([...messages, ...responseOldMessage]);
                setPageSize(pageSize + initialPageSize);
                setMessagesPage(messagesPage + 1);
            })
            .catch(error => {
                console.log("error: ", error)
            })
    };

    const getEmpji = (emojiData) => {
        setMessageInput(messageInput + emojiData.emoji);
    }

    const handleSendMessage = () => {
        handleCloseEmoji(false);
        if (messageInput.trim() == "") {
            return;
        } else {
            sendMessageSoket(messageInput);
        }
    }

    const sendMessageSoket = (content) => {
        if (stompClient) {
            setMessageInput("");
            const chatMessage = {
                "content": content,
                "senderId": userId,
                "reccive_id": friendId,
                "status": true
            };

            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));

            const newMessages =
            {
                content: content,
                status: true,
                createdDate: "",
                senderUser: {
                    id: userId
                }
            };

            setMessages([newMessages, ...messages]);
            handleScrollToBottom();
        }
    }

    const handleUploadMessageImage = (e) => {
        var filePath = URL.createObjectURL(e.target.files[0]);
        var file = e.target.files[0] //the file
        var reader = new FileReader() //this for convert to Base64 
        reader.readAsDataURL(e.target.files[0]) //start conversion...
        reader.onload = async function (e) { //.. once finished..
            var rawLog = reader.result.split(',')[1]; //extract only thee file data part
            var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadUserMessageImage" }; //preapre info to send to API

            // console.log("dataSend: ", dataSend);
            // render image in myMessage
            const newMessages =
            {
                content: "Đang tải ảnh...",
                status: true,
                createdDate: "",
                senderUser: {
                    id: userId
                }
            };

            setMessages([newMessages, ...messages]);

            await mediaApi.uploadMessageImage(dataSend)
                .then(res => res.json())
                .then((res) => {
                    console.log("upload image: ", res);
                    // send message image
                    sendMessageSoket(res.url);
                }).catch(e => console.log(e))
        }
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
            <div
                id="scrollableDiv"
                style={{
                    height: '64vh',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                }}
                ref={messageEl}
                onClick={() => { handleCloseEmoji(false) }}
            >
                <InfiniteScroll
                    dataLength={pageSize}
                    next={fetchMoreData}
                    style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                    inverse={true}
                    hasMore={hasMore}
                    loader={<Box className='circularProgress'>
                        <CircularProgress />
                    </Box>}
                    scrollableTarget="scrollableDiv"
                    className='chatBox'
                    ref={messageEl} onClick={() => { handleCloseEmoji(false) }}
                >
                    {messages && messages.map(({ content, senderUser, createdDate }, index) =>
                    (
                        <div key={index}>
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
                        </div>
                    ))}
                </InfiniteScroll>
            </div>

            {emoji && (
                <Box className="EmojiPicker">
                    <EmojiPicker onEmojiClick={(emojiData) => getEmpji(emojiData)} lazyLoadEmojis={true} />
                </Box>
            )}
            <Box className="footerChat">
                <IconButton onClick={() => { handleCloseEmoji(!emoji) }}>
                    <SentimentVerySatisfied />
                </IconButton>

                <IconButton sx={{ color: '#637381' }} component="label">
                    <input hidden type="file" accept="application/video, image/*" onChange={(e) => handleUploadMessageImage(e)} />
                    <ImageIcon />
                </IconButton>

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