import styles from './VideoSidebar.module.scss';
import classNames from 'classnames/bind';
import React, { useState } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Share';

const cx = classNames.bind(styles);
function VideoSidebar({ messages, shares, likes }) {
    const [liked, setLiked] = useState(false);

    return (
        <>
            <div className={cx('videoSidebar')}>
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
                    <p>{liked ? likes + 1 : likes}</p>
                </div>
                <div className={cx('videoSidebar__button')}>
                    <MessageIcon fontSize="large" />
                    <p>{messages}</p>
                </div>
                <div className={cx('videoSidebar__button')}>
                    <ShareIcon fontSize="large" />
                    <p>{shares}</p>
                </div>
            </div>
        </>
    );
}
export default VideoSidebar;
