import React, { useEffect, useRef, useState } from 'react';
import useElementOnScreen from '~/hooks/useElementOnScreen ';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import VideoFooter from './videoFooter';
import VideoSidebar from './videoSidebar';
import VideoThumbnail from 'react-video-thumbnail';

import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { IconButton, Typography } from '@mui/material';

const cx = classNames.bind(styles);

function Video({ index, url, song, description, channel, likes, messages, shares, muted, onEnableAudio }) {
    const [playing, setPlaying] = useState(false);

    const videoRef = useRef(null);
    const thumbnailRef = useRef(null);

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
            <div className={cx('video__thumbnail')} >
                <VideoThumbnail
                    videoUrl={url}
                    cors={true}
                    snapshotAtTime={5}
                    renderThumbnail={true} />
            </div>
            <video
                className={cx('video__player')}
                src={url}
                ref={videoRef}
                muted={muted}
                loop
                playsInline
                preload="true"
                alt={description}
            ></video>
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

            <VideoSidebar playing={playing} messages={messages} shares={shares} likes={likes} />
            <VideoFooter playing={playing} channel={channel} description={description} song={song} />
        </div>
    );
}
export default Video;
