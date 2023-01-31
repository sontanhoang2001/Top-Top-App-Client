
// api
import { Avatar, CardHeader, IconButton, Typography, Box, Collapse } from '@mui/material';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setReply } from '../commentSlice';
import { closeDialog } from '~/components/customizedDialog/dialogSlice';

import { red } from '@mui/material/colors';
import { Send, FavoriteIcon as Favorite, SentimentVerySatisfied, FavoriteBorder as FavoriteBorderIcon, ExpandMore as ExpandMoreIcon, MapsUgc as MapsUgcIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

import { useEffect, useState } from 'react';
import commentApi from '~/api/comment';
import { useNavigate } from 'react-router-dom';

const pageSize = 4;

function ChildrenComment({ userVideo, parentId, childrenTotal }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [comments, setComments] = useState();
    const [parentMoreComments, setParentMoreComments] = useState(false);

    const [pageNo, setPageNo] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    const handleFirstMoreReply = async (parentId) => {
        await commentApi.getChildrenComment(parentId, pageNo, pageSize)
            .then(res => {
                setComments(res.data.data);
                setTotalElements(res.data.totalElements)
                setParentMoreComments(true);
            })
            .catch(error => console.log(error))
    }

    // đợi reload comments
    // useEffect(() => {
    //     if (reloadChildrenComment[1] === true) {
    //         commentApi.getChildrenComment(reloadChildrenComment[0], 1, pageSize)
    //             .then(res => {
    //                 setComments(res.data.data);
    //                 setTotalElements(res.data.totalElements)
    //                 setParentMoreComments(true);
    //             })
    //             .catch(error => console.log(error))
    //     }
    // }, [reloadChildrenComment])

    const fetchMoreData = async () => {
        if (comments.length >= totalElements) {
            return;
        }

        await commentApi.getChildrenComment(parentId, pageNo + 1, pageSize)
            .then(res => {
                setTotalElements(res.data.totalElements)
                setComments([...comments, ...res.data.data]);
                setPageNo(pageNo + 1);
            })
            .catch(error => console.log(error))
    };

    const handleReply = (user) => {
        console.log("handle Reply: ", parentId)
        const payload = { parentId: parentId, replyUser: user, isChildren: true };
        dispatch(setReply(payload));
    }

    const handleGoToProfile = (alias) => {
        dispatch(closeDialog());
        navigate(`/@${alias}`);
    }

    const handleHiddenComment = () => {
        setPageNo(1);
        setParentMoreComments(false);
    }

    return (<>
        {parentMoreComments || (
            <div className="reply__container">
                <div className="reply__actionContainer" onClick={() => handleFirstMoreReply(parentId)}>
                    <p className="reply__ActionText" >Xem thêm câu trả lời khác ({childrenTotal})
                        <svg className="chevronDownFill" width="1em" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"></path></svg>
                    </p>
                </div>
            </div>
        )}

        <Collapse in={parentMoreComments} timeout="auto" unmountOnExit>
            {comments && comments.map(({ id, content, createdDate, user, childrenTotal, index }) => (
                <div key={createdDate} className='children__comment'>
                    <CardHeader sx={{ padding: "5px 16px 5px 16px" }}
                        avatar={
                            <Avatar aria-label="recipe" sx={{ width: '2rem', height: '2rem' }} src={user.avatar} onClick={() => handleGoToProfile(user.alias)}></Avatar>
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
                                <Typography variant="subtitle2" align='justify' marginRight='1.5rem' sx={{ cursor: "pointer" }} onClick={() => handleReply(user)}>Trả lời</Typography>
                            </Box>
                        )}
                    />
                </div>
            ))}
        </Collapse>

        <div style={{ display: "flex" }}>
            {parentMoreComments && totalElements - comments.length > 0 && (
                <div className="reply__container">
                    <div className="reply__actionContainer">
                        <p className="reply__ActionText" onClick={() => fetchMoreData()}>Xem thêm ({totalElements - comments.length})
                            <svg className='chevronDownFill' width="1em" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"></path></svg>
                        </p>
                    </div>
                </div>
            )}

            {parentMoreComments && (
                <div className="reply__container">
                    <div className="reply__actionContainer">
                        <p className="reply__ActionText" onClick={() => handleHiddenComment()}>Ẩn bớt
                            <svg className='chevronUpFill' width="1em" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"></path></svg>
                        </p>
                    </div>
                </div>
            )}
        </div>
    </>);
}

export default ChildrenComment;