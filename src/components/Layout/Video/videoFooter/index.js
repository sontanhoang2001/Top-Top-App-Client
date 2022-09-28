import React from 'react';
import styles from './VideoFooter.module.scss';
import classNames from 'classnames/bind';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const cx = classNames.bind(styles);

function VideoFooter({ channel, description, song }) {
    return (
        <div className={cx('videoFooter')}>
            <div className={cx('videoFooter__text')}>
                <h3>@{channel}</h3>
                <p>{description}</p>
                <div className={cx('videoFooter_ticker')}>
                    <MusicNoteIcon className={cx('videoFooter__icon')} />
                    <marquee scrollamount="10" className={cx('videoFooter__song')}>
                        <>
                            <p>{song}</p>
                        </>
                    </marquee>
                </div>
            </div>
            <img
                className={cx('videoFooter__record')}
                src="https://static.thenounproject.com/png/934821-200.png"
                alt=""
            />
        </div>
    );
}
export default VideoFooter;
