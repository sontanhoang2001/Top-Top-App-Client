import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';

// sections
import { ForgotPasswordForm } from '../sections/auth/forgotPassword';
import VideoLogin from '~/components/Layout/videoLogin';

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

export default function ForgotPassword() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  return (
    <RootStyle>
      <HeaderStyle>

        {smUp && (
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            Bạn chưa có tài khoản? {''}
            <Link variant="subtitle2" component={RouterLink} to="/register">
              Đăng ký
            </Link>
          </Typography>
        )}
      </HeaderStyle>

      {mdUp && (
        <VideoLogin />
      )}

      <Container maxWidth="sm">
        <ContentStyle>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: '700' }}>
            Khôi phục tài khoản
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 5 }}>Nhập email của bạn để hỗ trợ khôi phục tài khoản của bạn.</Typography>

          <ForgotPasswordForm />

          {!smUp && (
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Bạn chưa có tài khoản? {' '}
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Đăng ký
              </Link>
            </Typography>
          )}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
