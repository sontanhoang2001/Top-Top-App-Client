import React, { forwardRef, useEffect, useRef, useState } from 'react';
import useElementOnScreen from '~/hooks/useElementOnScreen ';
import classNames from 'classnames/bind';
import './Video.css';
import styles from './Video.module.scss';
import VideoFooter from './videoFooter';
import VideoSidebar from './videoSidebar';

// mui
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { IconButton, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Slide } from '@mui/material';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setVideo } from './videoSlice';

// api
import videoApi from '~/api/video';
import profileApi from '~/api/profile';

import { UserAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function Video({ index, id, url, avatarUser, song, title, channel, likes, comments, shares, muted, onEnableAudio, userVideo, profileVideo, enableComment }) {
    const dispatch = useDispatch();
    const { user } = UserAuth();
    const [playing, setPlaying] = useState(false);
    const [follow, setFollow] = useState(false);

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
    // const attemptPlay = () => {
    //     if (index == 0) {
    //         videoRef &&
    //             videoRef.current &&
    //             videoRef.current.play().catch((error) => {
    //                 console.error('Error attempting to play', error);
    //             });
    //     }
    // };

    const attemptPlay = () => {
        if (index == 0) {
            videoRef &&
                videoRef.current &&
                buffViewVideo();
        }
    };

    useEffect(() => {
        attemptPlay();

        if (isVisibile) {
            if (!playing) {
                videoRef.current.play();
                setPlaying(true);

                buffViewVideo();
                isYouFollowUser();

                const payload = { videoId: id, totalVideoPlayed: index, userVideo: userVideo };
                dispatch(setVideo(payload));

                // console.log(`video playing total:  ${index}`);
                // console.log(`current video:  ${videoRef.current}, videoID: ${id}`);
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
    }, [isVisibile]);

    const isYouFollowUser = () => {
        if (user)
            if (userVideo) {
                profileApi.isYouFollowUser(user.id, userVideo.id)
                    .then(res => {
                        setFollow(res.data.result);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
    }

    // thuật toán buff view
    const buffViewVideo = () => {
        videoApi.buffViewVideo(id)
            .then(res => {
                // console.log("buff view: ", res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
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
            <VideoSidebar videoId={id} playing={playing} avatarUser={avatarUser} channel={channel} comments={comments} shares={shares} likes={likes} userVideo={userVideo} isFollow={follow} profileVideo={profileVideo} enableComment={enableComment} />
            <VideoFooter playing={playing} channel={channel} title={title} song={song} />
        </div>
    );
}

export default Video;
