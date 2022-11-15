import styles from './comment.scss'
import { useEffect, useState } from 'react';

// api
import commentApi from '~/api/comment';
import { async } from '@firebase/util';

// auth provider
import { UserAuth } from '~/context/AuthContext';

// mui
import { createTheme, ThemeProvider, styled, Box, TextField, Button, CircularProgress } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Send, FavoriteIcon as Favorite, SentimentVerySatisfied, FavoriteBorder as FavoriteBorderIcon, ExpandMore as ExpandMoreIcon, MapsUgc as MapsUgcIcon } from '@mui/icons-material';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import ChildrenComment from './childrenComment';
import EmojiPicker from 'emoji-picker-react';
import classNames from 'classnames/bind';
import InfiniteScroll from 'react-infinite-scroll-component';
const cx = classNames.bind(styles);



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const theme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    maxWidth: "none !important"
                },
            },
        },

        MuiCardHeader: {
            styleOverrides: {
                root: {
                    padding: '16px 16px 0px 16px !important',
                },
                avatar: {
                    marginBottom: "24px",
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgb(244, 67, 54)",
                },
            },
        }
    }
})

const initialPageSize = 6;

function Comment() {
    const { user } = UserAuth();
    const [emoji, setEmoji] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState();

    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [totalElements, setTotalElements] = useState();
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const videoId = 1;
        commentApi.getCommentParent(videoId, pageNo, pageSize)
            .then(res => {
                console.log("res comment: ", res.data.data)
                setTotalElements(res.data.totalElements)
                setComments(res.data.data);
            })
            .catch(error => console.log(error))
    }, [])

    const fetchMoreData = () => {
        if (pageSize >= totalElements) {
            setHasMore(false);
            return;
        }

        console.log("fetch more data....")

        // await chatApi.getFriendMessage(userId, friendId, pageNo + 1, initialPageSize)
        //     .then(res => {
        //         const responseOldMessage = res.data.data;
        //         setMessages([...messages, ...responseOldMessage]);
        //         setPageSize(pageSize + initialPageSize);
        //         setPageNo(pageNo + 1);
        //     })
        //     .catch(error => {
        //         console.log("error: ", error)
        //     })
    };


    const handleSendMessage = async () => {
        handleCloseEmoji(false);
        if (commentInput.trim() == "") {

        } else {
            const dataRequest = {
                "content": commentInput,
                "parentId": null,
                "videoId": 1,
                "userId": user.id
            };

            commentApi.creatComment(dataRequest)
                .then(res => {
                    console.log("res createComment: ", res);
                })
                .catch(error => {
                    console.log("error: ", error);
                })
            setCommentInput("");
        }
    }

    const handleReply = (id) => {
        console.log("handle Reply: ", id)
    }


    const handleCloseEmoji = (value) => {
        setEmoji(value);
    }

    const getEmpji = (emojiData) => {
        setCommentInput(commentInput + emojiData.emoji);
    }


    // return (<>
    //     <ThemeProvider theme={theme}>
    //         <div className='commentBox'>
    //             {/* <Card sx={{ maxWidth: 345 }}>
    //                 <CardHeader
    //                     avatar={
    //                         <Avatar aria-label="recipe">
    //                             R
    //                         </Avatar>
    //                     }
    //                     action={
    //                         <IconButton aria-label="settings">
    //                             <MoreVertIcon />
    //                         </IconButton>
    //                     }
    //                     title={(
    //                         <>
    //                             <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Hiệp Định</Typography>
    //                             <Typography variant="subtitle2">Em đẹp lắm em ơi 🥰</Typography>
    //                         </>)}
    //                     subheader={(
    //                         <Box sx={{ display: "flex", marginTop: '0.4rem' }}>
    //                             <Typography variant="subtitle2" align='left' marginRight='1.5rem'>04/11</Typography>
    //                             <Typography variant="subtitle2" align='right'>Trả lời</Typography>
    //                         </Box>
    //                     )}
    //                 />
    //                 <CardMedia
    //                     component="img"
    //                     height="194"
    //                     width='auto'
    //                     image="https://s3.cloud.cmctelecom.vn/tinhte1/2017/09/4127716_21370996_757732914433829_7941595007667006352_n.jpg"
    //                     alt="Paella dish"
    //                 />
    //             </Card> */}

    //             <InfiniteScroll
    //                 dataLength={pageSize}
    //                 next={fetchMoreData}
    //                 hasMore={hasMore}
    //                 // loader={<Box className='circularProgress'>
    //                 //     <CircularProgress />
    //                 // </Box>}
    //                 onClick={() => { handleCloseEmoji(false) }}
    //             >
    //                 <Box onClick={() => setEmoji(false)}>
    //                     {comments && comments.map(({ id, content, createdDate, user, childrenTotal }, index) => (
    //                         <div key={id}>
    //                             <CardHeader
    //                                 avatar={
    //                                     <Avatar aria-label="recipe" src={user.avatar}></Avatar>
    //                                 }
    //                                 action={
    //                                     <IconButton aria-label="settings">
    //                                         <MoreVertIcon />
    //                                     </IconButton>
    //                                 }
    //                                 title={(
    //                                     <>
    //                                         <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{user.fullName}</Typography>
    //                                         <Typography variant="subtitle1">{content}</Typography>
    //                                     </>)}
    //                                 subheader={(
    //                                     <Box sx={{ display: "flex", marginTop: '0.4rem' }}>
    //                                         <Typography variant="subtitle2" align='left' marginRight='1.5rem'>{createdDate}</Typography>
    //                                         <Typography variant="subtitle2" align='justify' marginRight='1.5rem' sx={{ cursor: "pointer" }} onClick={() => handleReply(id)}>Trả lời</Typography>
    //                                         <Typography variant="subtitle2" align='right' sx={{ cursor: "pointer" }}><FavoriteBorderIcon /></Typography>
    //                                     </Box>
    //                                 )}
    //                             />

    //                             {childrenTotal > 0 ? (
    //                                 <ChildrenComment childrenId={id} childrenTotal={childrenTotal} />
    //                             ) : (<></>)}
    //                         </div>
    //                     ))}
    //                 </Box>
    //             </InfiniteScroll>

    //             {emoji && (
    //                 <Box className={cx('EmojiPicker')}>
    //                     <EmojiPicker onEmojiClick={(emojiData) => getEmpji(emojiData)} />
    //                 </Box>
    //             )}
    //             <Box className={cx('footerComment')}>
    //                 <IconButton onClick={() => { handleCloseEmoji(!emoji) }} sx={{ marginRight: '1rem' }}>
    //                     <SentimentVerySatisfied />
    //                 </IconButton>
    //                 <TextField className={cx('inputComment')} hiddenLabel variant="outlined" placeholder="Thêm bình luận..." value={commentInput} onChange={(e) => { setCommentInput(e.target.value) }} onClick={() => { handleCloseEmoji(false) }} />
    //                 <Button className={cx('btnCommentMd')} variant="contained" endIcon={<MapsUgcIcon />} size="large" onClick={handleSendMessage}>Bình luận</Button>
    //                 <Button className={cx('btnCommentSm')} variant="contained" size="large" onClick={handleSendMessage}><MapsUgcIcon /></Button>
    //             </Box>
    //         </div>

    //     </ThemeProvider>
    // </>);


    return (<>
        <ThemeProvider theme={theme}>
            <InfiniteScroll
                dataLength={pageSize}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Box className='circularProgress'>
                    <CircularProgress />
                </Box>}
                onClick={() => { handleCloseEmoji(false) }}
            >
                <Box onClick={() => setEmoji(false)} sx={{height: '60vh'}}>
                    {comments && comments.map(({ id, content, createdDate, user, childrenTotal }, index) => (
                        <div key={id}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" src={user.avatar}></Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={(
                                    <>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{user.fullName}</Typography>
                                        <Typography variant="subtitle1">{content}</Typography>
                                    </>)}
                                subheader={(
                                    <Box sx={{ display: "flex", marginTop: '0.4rem' }}>
                                        <Typography variant="subtitle2" align='left' marginRight='1.5rem'>{createdDate}</Typography>
                                        <Typography variant="subtitle2" align='justify' marginRight='1.5rem' sx={{ cursor: "pointer" }} onClick={() => handleReply(id)}>Trả lời</Typography>
                                        <Typography variant="subtitle2" align='right' sx={{ cursor: "pointer" }}><FavoriteBorderIcon /></Typography>
                                    </Box>
                                )}
                            />

                            {childrenTotal > 0 ? (
                                <ChildrenComment childrenId={id} childrenTotal={childrenTotal} />
                            ) : (<></>)}
                        </div>
                    ))}
                </Box>
            </InfiniteScroll>
        </ThemeProvider>
    </>);
}

export default Comment;