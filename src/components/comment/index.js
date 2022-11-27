import styles from './comment.scss'
import { useEffect, useRef, useState } from 'react';

// api
import commentApi from '~/api/comment';
import videoApi from '~/api/video';

import { async } from '@firebase/util';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { openSnackbar } from "~/components/customizedSnackbars/snackbarSlice";
import { setReply, selectParentId, selectReplyUser, selectIsChildren, setTotalComment } from './commentSlice';
import { selectVideoId } from '~/components/customizedDialog/dialogSlice';
import { selectUserVideo } from '~/components/Layout/Video/videoSlice';
import { closeDialog } from '~/components/customizedDialog/dialogSlice';

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
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const theme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    maxWidth: "none !important",
                },
            },
        },

        MuiCardHeader: {
            styleOverrides: {
                root: {
                    padding: '10px 16px 0px 16px !important',
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

const pageSize = 6;

function Comment() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = UserAuth();
    const [emoji, setEmoji] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [commentInputSubmit, setCommentInputSubmit] = useState("");
    const [comments, setComments] = useState();

    const [pageNo, setPageNo] = useState(1);
    const [totalElements, setTotalElements] = useState();
    const videoId = useSelector(selectVideoId);
    const parentId = useSelector(selectParentId);
    const replyUser = useSelector(selectReplyUser);
    const isChildren = useSelector(selectIsChildren);
    const userVideo = useSelector(selectUserVideo);

    const commentsRef = useRef([]);
    commentsRef.current = [];
    const [replyIndexCurrent, setReplyIndexCurrent] = useState();

    const addToCommentRefs = (el) => {
        if (el && !commentsRef.current.includes(el)) {
            commentsRef.current.push(el);
        }
        // console.log(commentsRef.current);
    };

    const commentBox = useRef(null);
    const inputCommentRef = useRef();

    // lần đầu load comments
    useEffect(() => {
        commentApi.getCommentParent(videoId, pageNo, pageSize)
            .then(res => {
                setTotalElements(res.data.totalElements)
                setComments(res.data.data);
                // đếm tổng số comment
                getTotalComment();
            })
            .catch(error => console.log(error))
    }, [videoId])

    // load lại comment ở page 1
    const reloadComment = async () => {
        await commentApi.getCommentParent(videoId, pageNo, pageSize)
            .then(res => {
                setTotalElements(res.data.totalElements)
                setComments(res.data.data);
                // đếm tổng số comment
                getTotalComment();
            })
            .catch(error => console.log(error))
    }

    const fetchMoreData = async () => {
        if (comments.length >= totalElements) {
            return;
        }

        await commentApi.getCommentParent(videoId, pageNo + 1, pageSize)
            .then(res => {
                setTotalElements(res.data.totalElements)
                setComments([...comments, ...res.data.data]);
                setPageNo(pageNo + 1);
                // đếm tổng số comment
                getTotalComment();
            })
            .catch(error => console.log(error))
    };

    const getTotalComment = async () => {
        await videoApi.findVideoById(videoId)
            .then(res => {
                dispatch(setTotalComment({ totalComment: res.data.comment }))
            })
            .catch(error => console.log(error))
    }

    // nếu là comment con thì click vào xem thêm để reload lại comment con
    useEffect(() => {
        if (replyIndexCurrent) {
            try {
                commentsRef.current[replyIndexCurrent].children[0].firstChild.click();
            } catch (error) {

            }
        }
    }, [comments])

    const handleCreateComment = async () => {
        handleCloseEmoji(false);
        if (commentInput.trim() === "") {

        } else {
            const dataRequest = {
                "content": commentInputSubmit,
                "parentId": parentId,
                "videoId": videoId,
                "userId": user.id
            };

            commentApi.creatComment(dataRequest)
                .then(res => {
                    console.log("res createComment: ", res);
                    reloadComment();
                    if (isChildren) {

                    } else {
                        commentBox.current.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        });
                    }
                    resetStateRedux();
                    setCommentInput("");
                })
                .catch(error => {
                    console.log(error);
                    const snackBarPayload = { type: 'error', message: 'Không thể bình luận ngay lúc này!' };
                    dispatch(openSnackbar(snackBarPayload))
                })
        }
    }

    const handleReply = (index, id, user) => {
        console.log("index reply: ", index);

        setReplyIndexCurrent(index);
        const payload = { parentId: id, replyUser: user, isChildren: true };
        dispatch(setReply(payload));
    }

    const resetStateRedux = () => {
        const payload = { parentId: null, isChildren: false };
        dispatch(setReply(payload));
    }

    const handleCloseEmoji = (value) => {
        setEmoji(value);
    }

    const getEmpji = (emojiData) => {
        setCommentInput(commentInput + emojiData.emoji);
    }

    const [replyAliasText, setReplyAliasText] = useState();
    useEffect(() => {
        if (parentId) {
            const letter = `Trả lời @${replyUser.alias} ${replyUser.fullName} : `;
            setReplyAliasText(letter.length)
            setCommentInput(letter);
        }
    }, [parentId, replyUser])

    // Phân tách comment cha vs comment con
    useEffect(() => {
        if (parentId) {
            if (replyAliasText > commentInput.length) {
                setCommentInput("");
                resetStateRedux();
            } else {
                setCommentInputSubmit(commentInput.slice(replyAliasText));
            }
        } else {
            setCommentInputSubmit(commentInput);
        }
    }, [commentInput])

    const handleGoToProfile = (alias) => {
        dispatch(closeDialog());
        navigate(`/@${alias}`);
    }

    return (<>
        <ThemeProvider theme={theme}>
            <div className='commentBox' ref={commentBox}>
                <Box onClick={() => setEmoji(false)}>
                    {comments && comments.map(({ id, content, createdDate, user, childrenTotal }, index) => (
                        <div key={id}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" src={user.avatar} onClick={() => handleGoToProfile(user.alias)}></Avatar>
                                }
                                title={(
                                    <>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }} onClick={() => handleGoToProfile(user.alias)}>{user.fullName}
                                            {" "}{userVideo.id === user.id ? (
                                                <p className='authorLabel'>Tác Giả</p>
                                            ) : (<></>)}</Typography>
                                        <Typography variant="subtitle1">{content}</Typography>
                                    </>)}
                                subheader={(
                                    <Box sx={{ display: "flex", marginTop: '0.4rem' }}>
                                        <Typography variant="subtitle2" align='left' marginRight='1.5rem'>{createdDate}</Typography>
                                        <Typography variant="subtitle2" align='justify' marginRight='1.5rem' sx={{ cursor: "pointer" }} onClick={() => handleReply(index, id, user)}>Trả lời</Typography>
                                    </Box>
                                )}
                            />

                            <div className='commentChildren' ref={addToCommentRefs}>
                                {childrenTotal > 0 ? (
                                    <ChildrenComment userVideo={userVideo} parentId={id} childrenTotal={childrenTotal} />
                                ) : (<></>)}
                            </div>
                        </div>
                    ))}

                    {comments && totalElements - comments.length > 0 && (
                        <div className="reply__actionContainer">
                            <p className="reply__ActionText" onClick={() => fetchMoreData()}>Xem thêm câu trả lời khác {totalElements - comments.length}
                                <svg className="chevronDownFill" width="1em" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"></path></svg>
                            </p>
                        </div>
                    )}
                </Box>

                {emoji && (
                    <Box className={cx('EmojiPicker')}>
                        <EmojiPicker onEmojiClick={(emojiData) => getEmpji(emojiData)} />
                    </Box>
                )}
            </div>
            <Box className={cx('footerComment')}>
                <IconButton onClick={() => { handleCloseEmoji(!emoji) }} sx={{ marginRight: '1rem' }}>
                    <SentimentVerySatisfied />
                </IconButton>
                <TextField ref={inputCommentRef} className={cx('inputComment')} hiddenLabel variant="outlined" placeholder="Thêm bình luận..." value={commentInput} onChange={(e) => { setCommentInput(e.target.value) }} onClick={() => { handleCloseEmoji(false) }} autoFocus />
                <Button className={cx('btnCommentMd')} variant="contained" endIcon={<MapsUgcIcon />} size="large" onClick={handleCreateComment}>Bình luận</Button>
                <Button className={cx('btnCommentSm')} variant="contained" size="large" onClick={handleCreateComment}><MapsUgcIcon /></Button>
            </Box>
        </ThemeProvider >
    </>);
}

export default Comment;