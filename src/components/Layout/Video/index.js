import React, { useEffect, useRef, useState } from 'react';
import useElementOnScreen from '~/hooks/useElementOnScreen ';
import classNames from 'classnames/bind';
import './Video.css';
import styles from './Video.module.scss';
import VideoFooter from './videoFooter';
import VideoSidebar from './videoSidebar';
import VideoThumbnail from 'react-video-thumbnail';

import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { IconButton, Typography } from '@mui/material';

const cx = classNames.bind(styles);

function Video({ index, url, avatarUser, song, title, channel, likes, comments, shares, muted, onEnableAudio }) {
    const [playing, setPlaying] = useState(false);

    const videoRef = useRef(null);

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
    };
    const isVisibile = useElementOnScreen(options, videoRef);
    const onVideoClick = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(!playing);
        } else {
            videoRef.current.play();
            setPlaying(!playing);
        }
    };

    // tự động phát cho video đầu tiên
    const attemptPlay = () => {
        if (index == 0) {
            videoRef &&
                videoRef.current &&
                videoRef.current.play().catch((error) => {
                    console.error('Error attempting to play', error);
                });
        }
    };


    useEffect(() => {
        attemptPlay();

        if (isVisibile) {
            if (!playing) {
                videoRef.current.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
    }, [isVisibile]);

    return (
        <div className={cx('video')}>
            <video
                className={cx('video__thumbnail')}
                src={url}
                alt={title}
            />
            <video
                className={cx('video__player')}
                src={url}
                ref={videoRef}
                muted={muted}
                loop
                playsInline
                preload="true"
                alt={title}
            />
            <div className={cx('container__btn')} onClick={onVideoClick}>
                {!playing && <div className={cx('btn__play')}></div>}
            </div>

            {muted && (
                <div className={cx('container__btn')} onClick={onEnableAudio}>
                    <div className={cx('DivUnmuteButton')}>
                        <IconButton>
                            <VolumeOffIcon />
                        </IconButton>
                        <Typography sx={{ fontSize: 'default', fontWeight: 'bold' }}>
                            Bỏ tắt tiếng
                        </Typography>
                    </div>
                </div>
            )}
            <VideoSidebar id={index} playing={playing} avatarUser={avatarUser} channel={channel} comments={comments} shares={shares} likes={likes} />
            <VideoFooter playing={playing} channel={channel} title={title} song={song} />
        </div>
    );
}
export default Video;
