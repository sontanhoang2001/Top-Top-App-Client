
// api
import { Avatar, CardHeader, IconButton, Typography, Box } from '@mui/material';

import { red } from '@mui/material/colors';
import { Send, FavoriteIcon as Favorite, SentimentVerySatisfied, FavoriteBorder as FavoriteBorderIcon, ExpandMore as ExpandMoreIcon, MapsUgc as MapsUgcIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

import { useState } from 'react';
import commentApi from '~/api/comment';

function ChildrenComment({ childrenId, childrenTotal }) {
    const [comments, setComments] = useState();
    const [parentMoreComments, setParentMoreComments] = useState(false);
    const [totalElements, setTotalElements] = useState(0);

    const handleMoreReply = (childrenId) => {
        // console.log("handle More Reply: ", id);
        // console.log("comment data:", commentParent)

        const pageNo = 1;
        const pageSize = 4;
        console.log("childrenId: ", childrenId)
        commentApi.getChildrenComment(childrenId, pageNo, pageSize)
            .then(res => {
                setComments(res.data.data);
                setTotalElements(res.data.data.totalElements)
                setParentMoreComments(true);
            })
            .catch(error => console.log(error))
    }

    const handleReply = (id) => {
        console.log("handle Reply: ", id)
    }

    return (<>
        {parentMoreComments || (
            <div className="reply__container">
                <div className="reply__actionContainer">
                    <p className="reply__ActionText" onClick={() => handleMoreReply(childrenId)}>Xem thêm câu trả lời khác ({childrenTotal})
                        <svg className="chevronDownFill" width="1em" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"></path></svg>
                    </p>
                </div>
            </div>
        )}

        {comments && comments.map(({ id, content, createdDate, user, childrenTotal, index }) => (
            <div key={createdDate} className='children__comment'>
                <CardHeader sx={{ padding: "5px 16px 5px 16px" }}
                    avatar={
                        <Avatar aria-label="recipe" sx={{ width: '2rem', height: '2rem' }} src={user.avatar}></Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={(
                        <>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{user.fillName}</Typography>
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
                <div className="reply__container">
                    <div className="reply__actionContainer">
                        <p className="reply__ActionText">Xem thêm
                            <svg className="chevronDownFill" width="1em" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"></path></svg>
                        </p>
                    </div>
                </div>
            </div>
        ))}
    </>);
}

export default ChildrenComment;