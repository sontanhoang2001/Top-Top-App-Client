import styles from '../Login/login.css'
import classNames from 'classnames/bind';

import { Link as RouterLink } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';

// sections
import { RegisterForm } from '../sections/auth/register';
import AuthSocial from '../sections/auth/AuthSocial';

// auth provider
import { UserAuth } from '~/context/AuthContext';
// video
import VideoLogin from '~/components/Layout/videoLogin';
import Title from '~/components/title';

const cx = classNames.bind(styles);

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));


const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const { setUserTempId } = UserAuth();

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Title titleString="Cá nhân" />

      <RootStyle>
        <HeaderStyle>
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }} className={cx('register')}>
              Bạn đã có tài khoản? {''}
              <Link variant="subtitle2" component={RouterLink} to="/login">
                Đăng nhập
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <VideoLogin />
        )}

        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Bắt đầu hoàn toàn miễn phí.
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Đăng nhập nhanh với các mạng xã hội.</Typography>

            <AuthSocial />

            <RegisterForm setUserTempId={setUserTempId} />

            {/* <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            Bằng cách đăng ký, tôi đồng ý với&nbsp;
            <Link underline="always" color="text.primary" href="#">
              Điều khoản dịch vụ
            </Link>
            {''} và {''}
            <Link underline="always" color="text.primary" href="#">
              Chính sách quyền riêng tư
            </Link>
            .
          </Typography> */}

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: '1rem' }}>
                Bạn đã có tài khoản? {''}
                <Link variant="subtitle2" component={RouterLink} to="/login">
                  Đăng nhập
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle >
    </>
  );
}
