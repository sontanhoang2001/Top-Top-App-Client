import styles from './login.css'
import classNames from 'classnames/bind';

import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import urlVideoIntro from '~/assets/video/How Do Small Businesses Win On TikTok-.mp4'

const cx = classNames.bind(styles);

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
}));

function VideoLogin() {
    return (
        <SectionStyle>
            <video
                className={cx('bgvideo__login')}
                src={urlVideoIntro}
                autoPlay={true}
                muted
                loop
            />
        </SectionStyle>);
}

export default VideoLogin;