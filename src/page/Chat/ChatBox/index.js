import './ChatBox.scss'
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import EmojiPicker from 'emoji-picker-react';

import { SentimentVerySatisfied, Send, Image as ImageIcon, ConstructionOutlined } from '@mui/icons-material';
import { styled, Avatar, Box, Card, CardHeader, TextField, Badge, Button, Chip, IconButton, CircularProgress, LinearProgress } from '@mui/material';
import Message from '../Message';

import InfiniteScroll from "react-infinite-scroll-component";
import ImageViewer from "react-simple-image-viewer";

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentImage, selectIsViewerOpen, selectListImagesViewer, imageViewer } from '../chatSlice';

// api
import chatApi from '~/api/chat';
import mediaApi from '~/api/media';
import { async } from '@firebase/util';

// audio
import urlAudioTyping from '~/assets/audio/mixkit-smartphone-typing-1393.wav';
import urlAudioReceiveMessage from '~/assets/audio/mixkit-alert-quick-chime-766.wav'


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

function ChatBox({ stompClient, receiveMessage, pendingMessage, friendInfo, userId, friendId }) {
    const [emoji, setEmoji] = useState(false);
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState("");
    const [messagePending, setMessagePending] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [totalElements, setTotalElements] = useState();

    const [pageSize, setPageSize] = useState(initialPageSize);
    const [hasMore, setHasMore] = useState(true);

    const messageEl = useRef(null)
    const [audioTyping] = useState(new Audio(urlAudioTyping));
    const [audioReceiveMessage] = useState(new Audio(urlAudioReceiveMessage));

    const initialState = () => {
        setPageNo(1);
        setPageSize(initialPageSize);
        setHasMore(true);
    }

    useEffect(() => {
        initialState();
        console.log("friendInfo: ", friendInfo)
        chatApi.getFriendMessage(userId, friendId, 1, initialPageSize)
            .then(res => {
                setMessages(res.data.data);
                setPageNo(res.data.pageNo)
                setTotalElements(res.data.totalElements)
            })
            .catch(error => {
                console.log("error: ", error)
            })
    }, [friendId])

    // Nhận tin nhắn
    useEffect(() => {
        if (receiveMessage !== "") {
            audioReceiveMessage.play();
            const { content, senderId } = receiveMessage;
            const newReceiveMessage = { content: content, senderUser: { id: senderId }, createdDate: "" };
            setMessages([newReceiveMessage, ...messages]);
            handleScrollToBottom();
        }
    }, [receiveMessage])

    // Lắng nghe đang soạn tin nhắn
    useEffect(() => {
        console.log("pendingMessage: ", pendingMessage)
        setMessagePending(pendingMessage);
        if (pendingMessage) {
            audioTyping.loop = true;
            audioTyping.play();
        } else {
            audioTyping.pause();
        }
    }, [pendingMessage])

    useEffect(() => {
        if (stompClient) {
            const chatMessage = {
                "content": messageInput,
                "senderId": userId,
                "reccive_id": friendId,
                "status": true
            };

            stompClient.send("/app/pending-message", {}, JSON.stringify(chatMessage));
        } else {
            console.log("ket noi that bai!")
        }
    }, [messageInput])



    // useEffect(() => {
    //     console.log("Messages lengh: ", messages.length - 1)

    // })

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

        await chatApi.getFriendMessage(userId, friendId, pageNo + 1, initialPageSize)
            .then(res => {
                const responseOldMessage = res.data.data;
                setMessages([...messages, ...responseOldMessage]);
                setPageSize(pageSize + initialPageSize);
                setPageNo(pageNo + 1);
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

        } else {
            setMessageInput("");
            clearPending();
            sendMessageSoket(messageInput);
        }
    }

    const sendMessageSoket = (content) => {
        if (stompClient) {
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
        } else {
            console.log("ket noi that bai!")
        }
    }

    const clearPending = () => {
        if (stompClient) {
            const chatMessage = {
                "content": "",
                "senderId": userId,
                "reccive_id": friendId,
                "status": true
            };

            stompClient.send("/app/pending-message", {}, JSON.stringify(chatMessage));
        } else {
            console.log("ket noi that bai!")
        }
    }
    const handleUploadMessageImage = (e) => {
        var filePath = URL.createObjectURL(e.target.files[0]);
        var file = e.target.files[0] //the file
        var reader = new FileReader() //this for convert to Base64 
        reader.readAsDataURL(e.target.files[0]) //start conversion...
        reader.onload = function (e) { //.. once finished..
            var rawLog = reader.result.split(',')[1]; //extract only thee file data part
            var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadUserMessageImage" }; //preapre info to send to API

            // console.log("dataSend: ", dataSend);
            // render image in myMessage
            const newMessages =
            {
                content: 'Đang gửi ảnh...',
                status: true,
                createdDate: "",
                senderUser: {
                    id: userId
                }
            };

            setMessages([newMessages, ...messages]);

            mediaApi.uploadMessageImage(dataSend)
                .then(res => res.json())
                .then((res) => {
                    console.log("upload image: ", res);
                    // send message image
                    sendMessageSoket(res.url);
                }).catch(e => console.log(e))
        }
    }

    // image viewer
    const dispatch = useDispatch();
    const currentImage = useSelector(selectCurrentImage);
    const isViewerOpen = useSelector(selectIsViewerOpen);
    const listImagesViewer = useSelector(selectListImagesViewer);

    const closeImageViewer = () => {
        const payload = { currentImage: 0, isViewerOpen: false };
        dispatch(imageViewer(payload))
    };

    // useEffect(() => {
    //     console.log("selectListImagesViewer: ", listImagesViewer)
    //     console.log("currentImage: ", currentImage)
    //     console.log("isViewerOpen: ", isViewerOpen)

    // })

    const enterPressed = (e) => {
        var keynum = e.keyCode || e.which;
        if (keynum == 13) {
            handleSendMessage();
        }
    }

    const handleMessageInput = (e) => {
        // console.log("check keyword: ", e.target.value)
        setMessageInput(e.target.value);
    }

    return (<>
        <Card sx={{ marginTop: '8px' }}>
            {friendInfo && (
                <CardHeader
                    sx={{ padding: '10px 10px 10px' }}
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
                    {messagePending && (
                        <Box sx={{ margin: '1rem' }}>
                            <Message avatarUrl={friendInfo.avatar} message="Đang soạn tin nhắn..." direction="left" createdDate="" />
                        </Box>
                    )}
                    {messages && messages.map(({ content, senderUser, createdDate }, index) =>
                    (
                        <div key={index}>
                            {userId === senderUser.id ? (
                                <>
                                    <Box sx={{ margin: '1rem' }}>
                                        <Message index={index} message={content} direction="right" createdDate={createdDate} />
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Box sx={{ margin: '1rem' }}>
                                        <Message index={index} avatarUrl={friendInfo.avatar} message={content} direction="left" createdDate={createdDate} />
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

                <TextField hiddenLabel id="outlined-basic" variant="outlined"
                    sx={{ width: '60%' }} placeholder="Aa" value={messageInput} onChange={(e) => handleMessageInput(e)} onClick={() => { handleCloseEmoji(false) }}
                    onKeyPress={(e) => enterPressed(e)}
                />
                <Button variant="contained" endIcon={<Send />} size="large" onClick={handleSendMessage}>
                    Gửi
                </Button>
            </Box>
        </Card>

        {isViewerOpen && (
            <ImageViewer
                src={listImagesViewer}
                currentIndex={currentImage}
                onClose={closeImageViewer}
                disableScroll={false}
                backgroundStyle={{
                    backgroundColor: "rgba(0,0,0,0.9)"
                }}
                closeOnClickOutside={true}
            />
        )}
    </>);
}

export default memo(ChatBox);