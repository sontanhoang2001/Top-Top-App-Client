import styles from './VideoSidebar.module.scss';
import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// mui
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
// import musicImg from '~/static/image/music/hoang.jpg'
// import diskIcon from '~/static/image/core/disk.png';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { openSnackbar } from "~/components/customizedSnackbars/snackbarSlice";
import { dialogComment, dialogCommentLock, dialogShare, dialogOptionVideo, dialogUpdateVideo } from '~/components/customizedDialog/dialogSlice'

// api
import videoApi from '~/api/video';
import profileApi from '~/api/profile';

// auth provider
import { UserAuth } from '~/context/AuthContext';
// import { set } from 'immer/dist/internal';
// import useId from '@mui/material/utils/useId';

const cx = classNames.bind(styles);
function VideoSidebar({ videoId, url, playing, avatarUser, channel, comments, shares, likes, userVideo, isFollow, profileVideo, enableComment }) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    // const videoId = useSelector(selectVideoId);
    const { user } = UserAuth();

    const [follow, setFollow] = useState(false);
    const [liked, setLiked] = useState(null);
    const [totalLiked, setTotalLiked] = useState(likes);

    const favoriteIconRef = useRef()

    // check để ẩn trạng thái follow
    useEffect(() => {
        if (isFollow === true) {
            setFollow(isFollow);
        }
    }, [isFollow])

    // tìm có Tim hay chưa ?
    useEffect(() => {
        if (videoId)
            if (user) {
                videoApi.isYouHeartThisVideo(videoId, user.id)
                    .then(res => {
                        // if (res.data === true) {
                        //     favoriteIconRef.current.style.color = 'var(--primary-btn-color)';
                        // }
                        setLiked(res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
    }, [user])

    const handleFollow = () => {
        if (user) {
            const data = {
                requestId: user.id,
                accetpId: userVideo.id,
            };
            profileApi.folllow(data)
                .then(() => {
                    setFollow(true);
                    const snackBarPayload = { type: 'success', message: `Bạn đã follow @${channel}` };
                    dispatch(openSnackbar(snackBarPayload))
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            navigate("/login");
        }
    }

    const handleClickOpenDialogShare = () => {
        const payload = { dialogStatus: true, videoId: videoId, videoUrl: url };
        dispatch(dialogShare(payload));
    };

    const handleClickOpenDialogOptionVideo = () => {
        const payload = { dialogStatus: true, videoId: videoId };
        dispatch(dialogOptionVideo(payload));
    };


    const handleClickOpenDialogComment = () => {
        if (user) {
            if (enableComment == true || userVideo.id == user.id) {
                const payload = { videoId: videoId };
                dispatch(dialogComment(payload));
            } else {
                dispatch(dialogCommentLock());
            }
        } else {
            navigate("/login");
        }
    };

    const handleLike = () => {
        if (user) {
            const request = {
                "videoId": videoId,
                "userId": user.id,
                "status": true
            };
            videoApi.likeVideo(request)
                .then(res => {
                    setLiked(true);
                    setTotalLiked(totalLiked + 1)
                })
                .catch((error) => {
                    console.log("error : ", error);
                })
        } else {
            navigate("/login");
        }
    }

    const handleUnLike = () => {
        const request = {
            "videoId": videoId,
            "userId": user.id,
            "status": false
        };
        videoApi.likeVideo(request)
            .then(res => {
                setLiked(false);
                setTotalLiked(totalLiked - 1)
            })
            .catch((error) => {
                console.log("error : ", error);
            })
    }

    return (
        <>
            <div className={cx('videoSidebar')}>
                <div className={cx('videoSidebar__button')}>
                    <Link to={`@${channel}`} ><Avatar alt="avatar" src={avatarUser} sx={{ width: 45, height: 45 }} /></Link>

                    {follow || (
                        <div className={cx('follow__button')} onClick={() => handleFollow()}>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#RedPlusCircleColor_filter0_d)"><path fillRule="evenodd" clipRule="evenodd" d="M14 25C20.6274 25 26 19.6274 26 13C26 6.37258 20.6274 1 14 1C7.37258 1 2 6.37258 2 13C2 19.6274 7.37258 25 14 25Z" fill="#FE2C55"></path></g><path d="M9.5 14C9.22386 14 9 13.7761 9 13.5V12.5C9 12.2239 9.22386 12 9.5 12H18.5C18.7761 12 19 12.2239 19 12.5V13.5C19 13.7761 18.7761 14 18.5 14H9.5Z" fill="white"></path><path d="M13 8.5C13 8.22386 13.2239 8 13.5 8H14.5C14.7761 8 15 8.22386 15 8.5V17.5C15 17.7761 14.7761 18 14.5 18H13.5C13.2239 18 13 17.7761 13 17.5V8.5Z" fill="white"></path><defs><filter id="RedPlusCircleColor_filter0_d" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="1"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter></defs></svg>
                        </div>
                    )}
                </div>

                <div className={cx('videoSidebar__button')}>
                    {liked ? (
                        <FavoriteIcon
                            fontSize="large"
                            onClick={handleUnLike}
                            style={{ color: 'var(--primary-btn-color)' }}
                            ref={favoriteIconRef}
                        />
                    ) : (
                        <FavoriteIcon fontSize="large" onClick={handleLike} ref={favoriteIconRef} />
                    )}
                    <p className={cx('videoSideBar__text')}>{totalLiked}</p>
                </div>

                <div className={cx('videoSidebar__button')} onClick={handleClickOpenDialogComment}>
                    {enableComment == true ? (
                        <MessageIcon fontSize="large" />
                    ) : (
                        <CommentsDisabledIcon fontSize="large" />
                    )}
                    <p className={cx('videoSideBar__text')}>{comments}</p>
                </div>

                <div className={cx('videoSidebar__button')} onClick={handleClickOpenDialogShare}>
                    <ShareIcon fontSize="large" />
                    <p className={cx('videoSideBar__text')}>{shares}</p>
                </div>
                {profileVideo && (
                    <div className={cx('videoSidebar__button')} onClick={handleClickOpenDialogOptionVideo}>
                        <MoreVertIcon fontSize="large" />
                    </div>
                )}
                {/* <div className={cx('videoSidebar__musicCover')}>
                    <div
                        className={cx('diskMusic')}
                        style={{
                            backgroundImage: `url('${diskIcon}')`, animationPlayState: `${playing ? 'inherit' : 'paused'}`,
                        }}
                    >
                        <div
                            className={cx('divMusic__Album')}
                            style={{
                                backgroundImage:
                                    `url(${musicImg})`,
                            }}
                        ></div>
                    </div>
                </div> */}
            </div>
        </>
    );
}
export default VideoSidebar;
