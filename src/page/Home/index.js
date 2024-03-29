import { useEffect, useState } from 'react';
import Video from '~/components/Layout/Video';

// api
import videoApi from '~/api/video';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Header from './Header';

import { urlFromDriveUrl } from '~/shared/helper';
import Loading from '~/components/Layout/Loading';

import CustomizedDialog from '~/components/customizedDialog';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectTotalVideoPlayed } from '~/components/Layout/Video/videoSlice';
import { selectVideoIdParam, selectCommentIdParam } from "~/router/routerPathSlice";
import { dialogComment } from '~/components/customizedDialog/dialogSlice'

// Auth provider
import { UserAuth } from '~/context/AuthContext';

import videoAds from '~/assets/video/How Do Small Businesses Win On TikTok-.mp4'
import { async } from '@firebase/util';

const cx = classNames.bind(styles);

const emptyVideo = {
    "id": 0,
    "title": "",
    "url": videoAds,
    "enableComment": false,
    "status": true,
    "view": 0,
    "heart": 0,
    "share": null,
    "professed": true,
    "comment": 0,
    "user": {
        "id": "b3ab6a54-c520-44ac-9619-1789712f7a2a",
        "email": "toptopappvideo@gmail.com",
        "alias": "toptopappvideoa40e1",
        "avatar": "https://lh3.googleusercontent.com/a/ALm5wu2qkQL1_bfIOFALC20xX90KwPMof-zGGmr9zNgR=s96-c",
        "fullName": "TopTop App Video",
        "history": null,
        "createdDate": "18-11-2022",
    }
}

const initialPageSize = 4;

function Home() {
    // const { user } = UserAuth();
    const dispath = useDispatch();
    const location = useLocation();
    const pathName = location.pathname;
    const navigate = useNavigate();

    const [enable, setEnable] = useState(false);
    const [videos, setVideo] = useState();
    const [muted, setMuted] = useState(true);

    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [totalElements, setTotalElements] = useState();
    const totalVideoPlayed = useSelector(selectTotalVideoPlayed);
    const videoIdParam = useSelector(selectVideoIdParam);
    const commentIdParam = useSelector(selectCommentIdParam);

    const onEnableAudio = () => {
        setMuted(false);
    };

    useEffect(() => {
        if (pathName === '/' || pathName === '/home' || pathName === `/${videoIdParam}` || pathName === `/${videoIdParam}/comment/${commentIdParam}`) {
            setEnable(true)
        } else {
            setEnable(false)
        }

        if (pathName === `/${videoIdParam}/comment/${commentIdParam}`) {
            const payload = { commentIdParam: videoIdParam };
            dispath(dialogComment(payload))
        }
    }, [pathName, videoIdParam])

    const [isLoaded, setIsLoaded] = useState(false);
    const [loadFirst, setLoadFirst] = useState(false);
    const [videoLocalStorage, setVideoLocalStorage] = useState(false);


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
        setLoadFirst(true);
    }, [loadFirst, videoIdParam])

    // lần đầu load page video
    
    const fetchFirstPageVideo = async () => {
        await videoApi.loadVideoNewsFeed(pageNo, pageSize)
            .then(res => {
                if (videos) {
                    setVideo([...videos, ...res.data.data]);
                } else {
                    setVideo(res.data.data);

                    // let localVideo = [];
                    // // check xem có dữ liệu trong local chưa ?
                    // const videoStorage = window.localStorage.getItem("video");

                    // if (videoStorage != null) {
                    //     for (let i = 0; i < res.data.data.length; i++) {
                    //         console.log("pass: ", JSON.parse(videoStorage))
                    //         if (JSON.parse(videoStorage)[i].statusVideo == false) {
                    //             localVideo.push(res.data.data[i]);
                    //         }
                    //     }

                    //     setVideo(localVideo);
                    // } else {
                    //     // Lần đầu tiên chưa có data thì setLocalStorage cho video
                    //     res.data.data.map((resVideo) => {
                    //         localVideo.push({ id: resVideo.id, statusVideo: false });
                    //     })
                    //     window.localStorage.setItem("video", JSON.stringify(localVideo));
                    //     setVideo(res.data.data);
                    // }
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

    // useEffect(() => {
    //     console.log("vides: ", videos)
    // })

    useEffect(() => {
        // console.log("totalVideoPlayed: ", totalVideoPlayed)
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
            // debug more video
            // console.log("totalVideoPlayed ne: ", totalVideoPlayed)
            // console.log("videos.lengt ", videos.length)

            if (totalVideoPlayed >= videos.length) {
                return;
            }

            videoApi.loadVideoNewsFeed(pageNo + 1, pageSize)
                .then(res => {
                    setVideo([...videos, ...res.data.data]);
                    setPageNo(res.data.pageNo);
                    setTotalElements(res.data.totalElements)

                    // setVideoLocalStorage([...videoLocalStorage, ...res.data.data]);
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
                    {videos && videos.map((video, index) => (
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
