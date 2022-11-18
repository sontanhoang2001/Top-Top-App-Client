import styles from './VideoSidebar.module.scss';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// mui
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import musicImg from '~/static/image/music/hoang.jpg'
import diskIcon from '~/static/image/core/disk.png';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { openSnackbar } from "~/components/customizedSnackbars/snackbarSlice";
import { dialogComment, dialogShare } from '~/components/customizedDialog/dialogSlice'
import { selectVideoId } from '../videoSlice';

// api
import apiVideo from '~/api/video';

// auth provider
import { UserAuth } from '~/context/AuthContext';
import useId from '@mui/material/utils/useId';

const cx = classNames.bind(styles);
function VideoSidebar({ playing, avatarUser, channel, comments, shares, likes }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const videoId = useSelector(selectVideoId);
    const { user } = UserAuth();

    const [follow, setFollow] = useState(false);
    const [liked, setLiked] = useState(null);

    useEffect(() => {
        if (follow) {
            const snackBarPayload = { type: 'success', message: `Bạn đã follow @${channel}` };
            dispatch(openSnackbar(snackBarPayload))
        }
    }, [follow])

    const handleClickOpenDialogShare = () => {
        const payload = { dialogStatus: true, dialogId: "id ne" };
        dispatch(dialogShare(payload));
    };

    const handleClickOpenDialogComment = () => {
        const payload = { dialogStatus: true, dialogId: "id ne" };
        dispatch(dialogComment(payload));
    };

    useEffect(() => {
        if (liked !== null)
            if (user) {
                if (liked) {
                    const request = {
                        "videoId": videoId,
                        "userId": user.id,
                        "status": true
                    };
                    apiVideo.likeVideo(request)
                        .then(res => {
                            console.log("res : ", res);
                        })
                        .catch((error) => {
                            console.log("error : ", error);
                        })
                } else {
                    const request = {
                        "videoId": videoId,
                        "userId": user.id,
                        "status": false
                    };
                    apiVideo.likeVideo(request)
                        .then(res => {
                            console.log("res : ", res);
                        })
                        .catch((error) => {
                            console.log("error : ", error);
                        })
                }
            } else {
                console.log("/login")
            }
    }, [liked])

    const handleLike = () => {
        if (user) {
            setLiked(true);
        } else {
            console.log("/login")
        }
    }

    const handleUnLike = () => {
        setLiked(false);
    }

    return (
        <>
            <div className={cx('videoSidebar')}>
                <div className={cx('videoSidebar__button')} onClick={() => setFollow(!follow)}>
                    <Avatar alt="avatar" src={avatarUser} sx={{ width: 45, height: 45 }} />
                    {follow || (
                        <div className={cx('follow__button')}>
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
                        />
                    ) : (
                        <FavoriteIcon fontSize="large" onClick={handleLike} />
                    )}
                    <p className={cx('videoSideBar__text')}>{liked ? likes + 1 : likes}</p>
                </div>
                <div className={cx('videoSidebar__button')} onClick={handleClickOpenDialogComment}>
                    <MessageIcon fontSize="large" />
                    <p className={cx('videoSideBar__text')}>{comments}</p>
                </div>
                <div className={cx('videoSidebar__button')} onClick={handleClickOpenDialogShare}>
                    <ShareIcon fontSize="large" />
                    <p className={cx('videoSideBar__text')}>{shares}</p>
                </div>
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
