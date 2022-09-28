import { useEffect, useState } from 'react';
import Video from '~/components/Layout/Video';
import video1 from '~/video/video1.mp4';
import video2 from '~/video/video2.mp4';
import video3 from '~/video/video3.mp4';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const videosFake = [
    {
        url: video1,
        likes: 329,
        messages: 124,
        shares: 34,
        description: 'Nhìn như này mà đòi nhảy au với mình 😗',
        channel: 'piitien1603',
        song: 'Aloha remix nhảy Au thả thính - SPX Entertainment',
    },
    {
        url: video2,
        likes: 129,
        messages: 24,
        shares: 14,
        description: 'Nhìn như này mà đòi nhảy au với mình 😗',
        channel: 'piitien1603',
        song: 'Aloha remix nhảy Au thả thính - SPX Entertainment',
    },
    {
        url: video3,
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
    const [videos, setVideo] = useState(videosFake);

    return (
        <>
            <div className={cx('video__container')}>
                {videos.map((video, index) => (
                    <>
                        <Video
                            index={index}
                            messages={video.messages}
                            likes={video.likes}
                            shares={video.shares}
                            description={video.description}
                            channel={video.channel}
                            song={video.song}
                            url={video.url}
                        />
                    </>
                ))}
            </div>
        </>
    );
}

export default Home;
