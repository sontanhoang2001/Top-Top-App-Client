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

const cx = classNames.bind(styles);


const videosFake = [
    {
        url: video1,
        likes: 581.7,
        comments: 3146,
        shares: 580,
        title: 'Em này dễ thương quá @xuhuong @cover @hathay @amnhac',
        channel: 'my30.01',
        song: 'nhạc nền - I ❤ My IDOL',
    },
    {
        url: video3,
        likes: 950,
        comments: 49,
        shares: 100,
        title:
            'Các vị trí trong bộ phận IT của FPT software #fptsoftwareacademy #LearnOnTikTok #tuyendungit #fypシ #xuhuong',
        channel: 'fptsoftwareacademy',
        song: 'nhạc nền - FSoft Academy - Học viện CNTT',
    },
    {
        url: video4,
        likes: 850,
        comments: 29,
        shares: 78,
        title: 'Vào đây mê không lối thoát lunnn #cantho #review #theanh28',
        channel: 'fptsoftwareacademy',
        song: 'nhạc nền - Di s Story in Can Tho',
    },
    {
        url: video5,
        likes: 479,
        comments: 876,
        shares: 26,
        title: 'Bạn thích mẫu áo nào? #jteeman #thoitrangdinh #outfitideas #99tiktokshoppingsale',
        channel: 'jteeman',
        song: 'follow liz sanchez if you are hot - LIZ SANCHEZ',
    },
    {
        url: video6,
        likes: 329,
        comments: 124,
        shares: 34,
        title: 'Nhìn như này mà đòi nhảy au với mình 😗',
        channel: 'piitien1603',
        song: 'Aloha remix nhảy Au thả thính - SPX Entertainment',
    },
    {
        url: video7,
        likes: 129,
        comments: 24,
        shares: 14,
        title: 'Nhìn như này mà đòi nhảy au với mình 😗',
        channel: 'piitien1603',
        song: 'Aloha remix nhảy Au thả thính - SPX Entertainment',
    },
    {
        url: "https://drive.google.com/uc?export=download&id=11t80AH_PK8JJSxWMjPDll4cCNsDRcrVT",
        likes: 829,
        comments: 324,
        shares: 4,
        title: 'Nhìn như này mà đòi nhảy au với mình 😗',
        channel: 'piitien1603',
        song: 'Aloha remix nhảy Au thả thính - SPX Entertainment',
    },
];

function Home() {
    const location = useLocation();
    const pathName = location.pathname;

    const [enable, setEnable] = useState(false);
    const [videos, setVideo] = useState({});
    const [muted, setMuted] = useState(true);

    const onEnableAudio = () => {
        setMuted(false);
    };

    useEffect(() => {
        if (pathName == '/' || pathName == '/home') {
            setEnable(true)
        } else {
            setEnable(false)
        }
    }, [pathName])

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        videoApi.loadVideoNewsFeed(1)
            .then(res => {
                console.log("res video ne: ", res.data.data);
                setVideo(res.data.data);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.log("error ne: ", error);
                setIsLoaded(false);
            })
    }, [])

    if (isLoaded) {
        return (
            <div style={{ display: enable ? 'inherit' : 'none' }}>
                <Header />
                <div className={cx('video__container')}>
                    {videos.map((video, index) => (
                        <div key={index}>
                            <Video
                                index={index}
                                id={video.id}
                                avatarUser={video.user.avatar}
                                comments='34'
                                likes={video.heart}
                                shares='123'
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
            </div >
        );
    } else {
        return <Loading />
    }
}

export default Home;
