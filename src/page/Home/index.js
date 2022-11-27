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
import { useLocation, useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Header from './Header';

import { urlFromDriveUrl } from '~/shared/helper';
import Loading from '~/components/Layout/Loading';

import InfiniteScroll from "react-infinite-scroll-component";
import { Box, CircularProgress } from '@mui/material';
import CustomizedDialog from '~/components/customizedDialog';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectTotalVideoPlayed } from '~/components/Layout/Video/videoSlice';
import { selectVideoIdParam } from "~/router/routerPathSlice";

// notification
import notification from '~/api/notification'

// Auth provider
import { UserAuth } from '~/context/AuthContext';

import urlAudioNotification from '~/assets/audio/iphone_notification_ringtone_iphone_sms_ringtones.mp3';


const cx = classNames.bind(styles);

const emptyVideo = {
    "id": 10,
    "title": "Thật sự là ko thể smooth như dancer đcc 💔 nên mng cứ xem cho vui thôi nhé ạ!!",
    "url": "https://drive.google.com/uc?export=view&id=1DHS_fQpGcO9ZYloGIijAdUbAX-7epx_7",
    "enableComment": true,
    "status": true,
    "view": 415,
    "heart": 7,
    "share": null,
    "professed": true,
    "comment": 32,
    "user": {
        "id": "b3ab6a54-c520-44ac-9619-1789712f7a2a",
        "email": "toptopappvideo@gmail.com",
        "alias": "toptopappvideoa40e1",
        "avatar": "https://lh3.googleusercontent.com/a/ALm5wu2qkQL1_bfIOFALC20xX90KwPMof-zGGmr9zNgR=s96-c",
        "fullName": "TopTop App Video",
        "history": null,
        "createdDate": "18-11-2022",
        "role": {
            "id": 5,
            "name": "ROLE_USER",
            "alias": "Customer",
            "description": "Customer Of Website"
        },
    }
}

const initialPageSize = 4;

function Home() {
    const { user } = UserAuth();
    const location = useLocation();
    const pathName = location.pathname;
    const dispath = useDispatch();

    const [enable, setEnable] = useState(false);
    const [videos, setVideo] = useState();
    const [muted, setMuted] = useState(true);

    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    // const [hasMore, setHasMore] = useState(true);
    const [totalElements, setTotalElements] = useState();
    const totalVideoPlayed = useSelector(selectTotalVideoPlayed);
    const videoIdParam = useSelector(selectVideoIdParam);

    const [audioNotification] = useState(new Audio(urlAudioNotification));
    // Lắng nghe thông báo
    useEffect(() => {
        if (user) {
            try {
                notification.getNotification(user.id).addEventListener("user-list-event", (event) => {
                    const data = JSON.parse(event.data);

                    if (data.length > 0) {
                        audioNotification.play();
                    }

                    // else {
                    //     // console.log("thông báo nè: ", data);
                    //     // console.log("Chưa có thông báo...");
                    // }
                })
            } catch (error) {
            }
        }
    }, [user])

    const onEnableAudio = () => {
        setMuted(false);
    };

    useEffect(() => {
        if (pathName === '/' || pathName === '/home' || pathName === `/${videoIdParam}`) {
            setEnable(true)
        } else {
            setEnable(false)
        }
    }, [pathName, videoIdParam])

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (videoIdParam) {
            videoApi.findVideoById(videoIdParam)
                .then(res => {
                    // empty Video video quảng cáo xin back-end
                    setVideo([res.data, emptyVideo]);
                    setIsLoaded(true);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            // fetch first page video
            fetchFirstPageVideo();
        }
    }, [videoIdParam])

    // lần đầu load page video
    const fetchFirstPageVideo = () => {
        videoApi.loadVideoNewsFeed(pageNo, pageSize)
            .then(res => {
                if (videos) {
                    setVideo([...videos, ...res.data.data]);
                } else {
                    setVideo(res.data.data);
                }
                setPageNo(res.data.pageNo);
                setTotalElements(res.data.totalElements)
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log(error);
                setIsLoaded(false);
            })
    }

    useEffect(() => {
        if (videoIdParam) {
            if (totalVideoPlayed >= 1) {

                fetchFirstPageVideo();
            }
        }
    }, [totalVideoPlayed])

    // fetch more video
    useEffect(() => {
        // check limit 
        if (videos) {
            if (videos.length >= totalElements) {
                return;
            }

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
                                userVideo={video.user}
                                enableComment={video.enableComment}
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
