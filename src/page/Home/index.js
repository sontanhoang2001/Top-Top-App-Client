import { useEffect, useState } from 'react';
import Video from '~/components/Layout/Video';
import video1 from '~/static/video/video1.mp4';
import video3 from '~/static/video/video3.mp4';
import video4 from '~/static/video/video4.mp4';
import video5 from '~/static/video/video5.mp4';
import video6 from '~/static/video/video6.mp4';
import video7 from '~/static/video/video7.mp4';
import video8 from '~/static/video/video8.mp4';

// api
import videoApi from '~/api/video';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Header from './Header';
import { useLocation } from 'react-router-dom';

import { urlFromDriveUrl } from '~/shared/helper';
import Loading from '~/components/Layout/Loading';

import InfiniteScroll from "react-infinite-scroll-component";
import { Box, CircularProgress } from '@mui/material';
import CustomizedDialog from '~/components/customizedDialog';

// redux
import { useSelector } from 'react-redux';
import { selectTotalVideoPlayed } from '~/components/Layout/Video/videoSlice';

// notification
import notification from '~/api/notification'

// Auth provider
import { UserAuth } from '~/context/AuthContext';

import urlAudioNotification from '~/assets/audio/iphone_notification_ringtone_iphone_sms_ringtones.mp3';


const cx = classNames.bind(styles);


const initialPageSize = 4;

function Home() {
    const { user } = UserAuth();
    const location = useLocation();
    const pathName = location.pathname;

    const [enable, setEnable] = useState(false);
    const [videos, setVideo] = useState({});
    const [muted, setMuted] = useState(true);

    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    // const [hasMore, setHasMore] = useState(true);
    const [totalElements, setTotalElements] = useState();
    const totalVideoPlayed = useSelector(selectTotalVideoPlayed);

    const [audioNotification] = useState(new Audio(urlAudioNotification));
    // thông báo
    // useEffect(() => {
    //     if (user) {
    //         try {
    //             notification.getNotification(user.id).addEventListener("user-list-event", (event) => {
    //                 const data = JSON.parse(event.data);

    //                 if (data.length > 0) {
    //                     audioNotification.play();
    //                     // console.log("thông báo nè: ", data);
    //                 } else {
    //                     // console.log("Chưa có thông báo...");
    //                 }
    //             })
    //         } catch (error) {
    //         }
    //     }
    // }, [user])

    const onEnableAudio = () => {
        setMuted(false);
    };

    useEffect(() => {
        if (pathName === '/' || pathName === '/home') {
            setEnable(true)
        } else {
            setEnable(false)
        }
    }, [pathName])

    const [isLoaded, setIsLoaded] = useState(false);
    // fetch first page video
    useEffect(() => {
        videoApi.loadVideoNewsFeed(pageNo, pageSize)
            .then(res => {
                // console.log("res video ne: ", res.data.data);
                setVideo(res.data.data);
                setPageNo(res.data.pageNo);
                setTotalElements(res.data.totalElements)
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error);
                setIsLoaded(false);
            })
    }, [])

    // fetch more video
    useEffect(() => {
        // check limit 
        if (totalVideoPlayed >= pageSize - 1) {
            videoApi.loadVideoNewsFeed(pageNo + 1, pageSize)
                .then(res => {
                    setVideo([...videos, ...res.data.data]);
                    setPageNo(res.data.pageNo + 1);
                    setTotalElements(res.data.totalElements)
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoaded(false);
                })
        }
    }, [totalVideoPlayed])

    if (isLoaded) {
        return (
            <div style={{ display: enable ? 'inherit' : 'none' }}>
                <Header />
                <div className={'video-scrollbar ' + cx('video__container')}>
                    {videos.map((video, index) => (
                        <div key={index}>
                            <Video
                                index={index}
                                id={video.id}
                                avatarUser={video.user.avatar}
                                comments={video.comment}
                                likes={video.heart}
                                shares={video.share}
                                title={video.title}
                                channel={video.user.alias}
                                song={video.musicUrl}
                                url={urlFromDriveUrl(video.url)}
                                muted={muted}
                                onEnableAudio={onEnableAudio}
                            />
                        </div>
                    ))}
                </div>
                <CustomizedDialog />
            </div >
        );
    } else {
        return <Loading />
    }
}

export default Home;
