import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import VideoFooter from './videoFooter';
import VideoSidebar from './videoSidebar';

const cx = classNames.bind(styles);

function Video({ index, url, song, description, channel, likes, messages, shares }) {
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);

    const videoRef = useRef(null);

    const attemptPlay = () => {
        if (index == 0) {
            setPlaying(true);
            videoRef &&
                videoRef.current &&
                videoRef.current.play().catch((error) => {
                    console.error('Error attempting to play', error);
                });
        }
    };

    useEffect(() => {
        attemptPlay();
    }, []);

    const onVideoPress = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);

            // Nếu lần đầu == true thì setMuted = false
            muted && setMuted(false);
        }
    };

    return (
        <div className={cx('video')}>
            <video className={cx('video__thumbnail')} src={url}></video>
            <video
                className={cx('video__player')}
                src={url}
                ref={videoRef}
                muted={muted}
                loop
                playsInline
                alt={description}
            ></video>
            <div className={cx('container__btn')} onClick={onVideoPress}>
                {playing || <div className={cx('btn__play')}></div>}
            </div>
            <VideoFooter channel={channel} description={description} song={song} />
            <VideoSidebar messages={messages} shares={shares} likes={likes} />
        </div>
    );
}
export default Video;
