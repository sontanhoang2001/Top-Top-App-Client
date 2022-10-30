import { useEffect, useState } from 'react';
import Video from '~/components/Layout/Video';
import video1 from '~/static/video/video1.mp4';
import video3 from '~/static/video/video3.mp4';
import video4 from '~/static/video/video4.mp4';
import video5 from '~/static/video/video5.mp4';
import video6 from '~/static/video/video6.mp4';
import video7 from '~/static/video/video7.mp4';
import video8 from '~/static/video/video8.mp4';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Header from './Header';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const videosFake = [
    {
        url: video1,
        likes: 581.7,
        messages: 3146,
        shares: 580,
        description: 'Em này dễ thương quá @xuhuong @cover @hathay @amnhac',
        channel: 'my30.01',
        song: 'nhạc nền - I ❤ My IDOL',
    },
    {
        url: video3,
        likes: 950,
        messages: 49,
        shares: 100,
        description:
            'Các vị trí trong bộ phận IT của FPT software #fptsoftwareacademy #LearnOnTikTok #tuyendungit #fypシ #xuhuong',
        channel: 'fptsoftwareacademy',
        song: 'nhạc nền - FSoft Academy - Học viện CNTT',
    },
    {
        url: video4,
        likes: 850,
        messages: 29,
        shares: 78,
        description: 'Vào đây mê không lối thoát lunnn #cantho #review #theanh28',
        channel: 'fptsoftwareacademy',
        song: 'nhạc nền - Di s Story in Can Tho',
    },
    {
        url: video5,
        likes: 479,
        messages: 876,
        shares: 26,
        description: 'Bạn thích mẫu áo nào? #jteeman #thoitrangdinh #outfitideas #99tiktokshoppingsale',
        channel: 'jteeman',
        song: 'follow liz sanchez if you are hot - LIZ SANCHEZ',
    },
    {
        url: video6,
        likes: 329,
        messages: 124,
        shares: 34,
        description: 'Nhìn như này mà đòi nhảy au với mình 😗',
        channel: 'piitien1603',
        song: 'Aloha remix nhảy Au thả thính - SPX Entertainment',
    },
    {
        url: video7,
        likes: 129,
        messages: 24,
        shares: 14,
        description: 'Nhìn như này mà đòi nhảy au với mình 😗',
        channel: 'piitien1603',
        song: 'Aloha remix nhảy Au thả thính - SPX Entertainment',
    },
    {
        url: "https://drive.google.com/uc?export=download&id=11t80AH_PK8JJSxWMjPDll4cCNsDRcrVT",
        likes: 829,
        messages: 324,
        shares: 4,
        description: 'Nhìn như này mà đòi nhảy au với mình 😗',
        channel: 'piitien1603',
        song: 'Aloha remix nhảy Au thả thính - SPX Entertainment',
    },
];

const cx = classNames.bind(styles);

function Home() {
    const location = useLocation();
    const pathName = location.pathname;

    // const currentPage = useSelector((state) => state.currentPage.value);
    const [enable, setEnable] = useState(false);
    const [videos, setVideo] = useState(videosFake);
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

    return (
        <div className={enable} style={{ display: enable ? 'inherit' : 'none' }}>
            <Header />
            <div className={cx('video__container')}>
                {videos.map((video, index) => (
                    <div key={index}>
                        <Video
                            index={index}
                            messages={video.messages}
                            likes={video.likes}
                            shares={video.shares}
                            description={video.description}
                            channel={video.channel}
                            song={video.song}
                            url={video.url}
                            muted={muted}
                            onEnableAudio={onEnableAudio}
                        />
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Home;
