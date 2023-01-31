import React, { useEffect, useRef } from 'react';
import styles from './VideoFooter.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
// import MusicNoteIcon from '@mui/icons-material/MusicNote';

const cx = classNames.bind(styles);

function VideoFooter({ channel, title }) {
    // playing, song
    // const textSongRef = useRef();

    // useEffect(() => {
    //     if (playing) {
    //         textSongRef.current.start()
    //     } else {
    //         textSongRef.current.stop()
    //     }

    // }, [playing])

    return (
        <div className={cx('videoFooter')}>
            <div className={cx('videoFooter__text')}>
                <Link className={cx('videoFooter__text--channel')} to={`@${channel}`}>@{channel}</Link>
                <p className={cx('videoFooter__text--description')}>{title}</p>
                {/* <div className={cx('videoFooter_ticker')}>
                    <MusicNoteIcon className={cx('videoFooter__icon')} />
                    <marquee ref={textSongRef} scrollamount="8" className={cx('videoFooter__song')}>
                        <>
                            <p className={cx('videoFooter__text--song')}>{song}</p>
                        </>
                    </marquee>
                </div> */}
            </div>
        </div>
    );
}
export default VideoFooter;
