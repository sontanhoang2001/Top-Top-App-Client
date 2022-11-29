import { Fragment, useEffect, useState } from 'react';
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
import { Chip } from '@mui/material';

// Auth provider
import { UserAuth } from '~/context/AuthContext';
import { Link, useNavigate, useParams } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';

// api
import notificationApi from '~/api/notification';

const initialPageSize = 10;
const estringNotificationType = [
    "Đã thích video của bạn",
    "Đã bình luận video của bạn",
    "Đã trả lời video của bạn",
    "Đã theo dõi bạn",
    "Đã gửi tin nhắn đến bạn",
];

export default function BottomAppBar() {
    const { user } = UserAuth();
    const { notificationType } = useParams();
    const navigate = useNavigate();

    const [notifition, setNotifition] = useState();
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [hasMore, setHasMore] = useState(true);
    const [totalElements, setTotalElements] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    const translatePastTime = (pathTime) => {
        // moments ago, 1 second ago, 1 minute ago, 1 hour ago, 1 week ago, 1 month ago, 1 year ago,
        var positionToDayMoments = pathTime.search("moments");
        var positionToDaySecond = pathTime.search("second");
        var positionToDayMinute = pathTime.search("minute");
        var positionToDayHour = pathTime.search("hour");
        var positionToDay1Day = pathTime.search("1 days ago");
        var positionToDay2Day = pathTime.search("2 days ago");

        if (positionToDayMoments > -1) {
            return <p>vừa xong</p>;
        }
        if (positionToDaySecond > -1) {
            return <p>{`${pathTime.split(" ")[0]} giây trước`}</p>;
        }
        if (positionToDayMinute > -1) {
            return <p>{`${pathTime.split(" ")[0]} phút trước`}</p>;
        }
        if (positionToDayHour > -1) {
            return <p>{`${pathTime.split(" ")[0]} giờ trước`}</p>;
        }
        if (positionToDay1Day > -1) {
            return <p>{`${pathTime.split(" ")[0]} 1 ngày trước trước`}</p>;
        }
        if (positionToDay2Day > -1) {
            return <p>{`${pathTime.split(" ")[0]} 2 ngày trước`}</p>;
        }
    };

    // click vào và goto page
    const handleGotoPage = (notificationType, id, userFrom, videoId, commentId) => {
        // Click is read notification
        notificationApi.isRead(id)
            .then(() => {

            })
            .catch(error => console.log(error))

        //  "Đã thích video của bạn",
        // "Đã bình luận video của bạn",
        // "Đã trả lời video của bạn",
        if (notificationType == 0 || notificationType == 1 || notificationType == 2) {
            navigate(`/${videoId}`);
        }

        // "Đã theo dõi bạn",
        if (notificationType == 3) {
            navigate(`/@${userFrom.alias}`);
        }

        // "Đã gửi tin nhắn đến bạn",
        if (notificationType == 4) {
            navigate(`/chat/${userFrom.id}`);
        }
    }

    const getEnumNotificationType = (notificationType, content) => {
        if (notificationType === 1 || notificationType === 2 || notificationType === 4) {
            return `${estringNotificationType[notificationType]}: ${content}`;
        }

        return `${estringNotificationType[notificationType]}`
    }

    useEffect(() => {
        // console.log("notificationType: ", notificationType)
        if (notificationType == 0 || notificationType == undefined) {
            notificationApi.getNotificationByUserId(user.id, pageNo, pageSize)
                .then(res => {
                    setNotifition(res.data.data);
                    setTotalElements(res.data.totalElements);
                    setPageNo(res.data.pageNo);
                })
                .catch(error => console.log(error))
        } else if (notificationType == 1) {
            notificationApi.getNotificationByUserIdAndUnread(user.id, pageNo, pageSize)
                .then(res => {
                    setNotifition(res.data.data);
                    setTotalElements(res.data.totalElements);
                    setPageNo(res.data.pageNo);
                })
                .catch(error => console.log(error))
        }
    }, [notificationType])

    // fetch More notification
    const fetchMoreNotification = () => {
        if (notifition.length >= totalElements) {
            setHasMore(false);
            return;
        }

        if (notificationType == 0 || notificationType == undefined) {
            notificationApi.getNotificationByUserId(user.id, pageNo + 1, pageSize)
                .then(res => {
                    setNotifition([...notifition, ...res.data.data]);

                    setPageNo(res.data.pageNo);
                    setTotalElements(res.data.totalElements)
                })
                .catch(error => console.log(error))
        } else if (notificationType == 1) {
            notificationApi.getNotificationByUserIdAndUnread(user.id, pageNo + 1, pageSize)
                .then(res => {
                    setNotifition([...notifition, ...res.data.data]);

                    setPageNo(res.data.pageNo);
                    setTotalElements(res.data.totalElements)
                })
                .catch(error => console.log(error))
        }
    }

    if (setIsLoaded) {
        return (
            <>
                <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
                    Thông báo của bạn
                </Typography>

                <Box sx={{ ml: 2, padding: '10px' }}>
                    <Link to='/notification/0' className='link'>
                        <Chip label="Mới nhất" component="a" clickable sx={{ marginRight: '0.4rem' }} color={(notificationType == 0 || notificationType == undefined) ? 'primary' : 'default'} />
                    </Link>
                    <Link to='/notification/1' className='link'>
                        <Chip label="Chưa đọc" component="a" clickable sx={{ marginRight: '0.4rem' }} color={notificationType == 1 ? 'primary' : 'default'} />
                    </Link>
                </Box>

                <div className='container__center'>
                    {/* <CssBaseline /> */}
                    <Paper square sx={{ pb: '50px' }}>

                        {notifition && (
                            <List sx={{ mb: 2 }}>
                                <InfiniteScroll
                                    dataLength={notifition.length}
                                    next={fetchMoreNotification}
                                    hasMore={hasMore}
                                >
                                    {notifition.map(({ id, userFrom, notificationType, content, readed, pastTime, videoId, commentId }) => (
                                        <Fragment key={id}>
                                            <ListItem button sx={{ background: readed == false ? 'rgb(145 158 171 / 11%)' : '' }} onClick={() => handleGotoPage(notificationType, id, userFrom, videoId, commentId)}>
                                                <ListItemAvatar>
                                                    <Avatar alt={userFrom.fullName} src={userFrom.avatar} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={(
                                                        <Box display='flex'>
                                                            <Typography variant='subtitle2' sx={{ marginRight: '5px' }}>{userFrom.fullName}</Typography>
                                                            <Typography variant='body2'>{getEnumNotificationType(notificationType, content)}</Typography>
                                                        </Box>
                                                    )} secondary={translatePastTime(pastTime)} />
                                            </ListItem>
                                        </Fragment>
                                    ))}
                                </InfiniteScroll>
                            </List>
                        )}
                    </Paper>
                </div>
            </>
        );
    }

}
