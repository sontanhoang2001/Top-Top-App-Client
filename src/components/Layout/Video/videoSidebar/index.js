import styles from './VideoSidebar.module.scss';
import classNames from 'classnames/bind';
import React, { useState } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Share';
import diskIcon from '~/static/image/core/disk.png';
import Avatar from '@mui/material/Avatar';

import musicImg from '~/static/image/music/hoang.jpg'


const cx = classNames.bind(styles);
function VideoSidebar({ playing, messages, shares, likes }) {
    const [liked, setLiked] = useState(false);

    return (
        <>
            <div className={cx('videoSidebar')}>
                <div className={cx('videoSidebar__button')}>
                    <Avatar alt="avatar" src="https://mui.com/static/images/avatar/1.jpg" sx={{ width: 45, height: 45 }}
                    />
                    <div className={cx('follow__button')}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#RedPlusCircleColor_filter0_d)"><path fill-rule="evenodd" clip-rule="evenodd" d="M14 25C20.6274 25 26 19.6274 26 13C26 6.37258 20.6274 1 14 1C7.37258 1 2 6.37258 2 13C2 19.6274 7.37258 25 14 25Z" fill="#FE2C55"></path></g><path d="M9.5 14C9.22386 14 9 13.7761 9 13.5V12.5C9 12.2239 9.22386 12 9.5 12H18.5C18.7761 12 19 12.2239 19 12.5V13.5C19 13.7761 18.7761 14 18.5 14H9.5Z" fill="white"></path><path d="M13 8.5C13 8.22386 13.2239 8 13.5 8H14.5C14.7761 8 15 8.22386 15 8.5V17.5C15 17.7761 14.7761 18 14.5 18H13.5C13.2239 18 13 17.7761 13 17.5V8.5Z" fill="white"></path><defs><filter id="RedPlusCircleColor_filter0_d" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="1"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter></defs></svg>
                    </div>
                </div>

                <div className={cx('videoSidebar__button')}>
                    {liked ? (
                        <FavoriteIcon
                            fontSize="large"
                            onClick={(e) => setLiked(false)}
                            style={{ color: 'var(--primary-btn-color)' }}
                        />
                    ) : (
                        <FavoriteIcon fontSize="large" onClick={(e) => setLiked(true)} />
                    )}
                    <p className={cx('videoSideBar__text')}>{liked ? likes + 1 : likes}</p>
                </div>
                <div className={cx('videoSidebar__button')}>
                    <MessageIcon fontSize="large" />
                    <p className={cx('videoSideBar__text')}>{messages}</p>
                </div>
                <div className={cx('videoSidebar__button')}>
                    <ShareIcon fontSize="large" />
                    <p className={cx('videoSideBar__text')}>{shares}</p>
                </div>
                <div className={cx('videoSidebar__musicCover')}>
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
                </div>
            </div>
        </>
    );
}
export default VideoSidebar;
