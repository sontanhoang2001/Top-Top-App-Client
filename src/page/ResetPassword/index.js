import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUserId } from '~/context/authSlice'
import { openSnackbar } from "~/components/customizedSnackbars/snackbarSlice";
import { selectDirection } from "~/router/routerPathSlice";

// sections
import { ResetPasswordForm } from '../sections/auth/resetPassword';

// auth provider
import { UserAuth } from '~/context/AuthContext';
import VideoLogin from '~/components/Layout/videoLogin';
import Title from '~/components/title';
import { useEffect } from 'react';

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

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
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

export default function ChangePassword() {
  const navigate = useNavigate();
  const direction = useSelector(selectDirection);
  const { userTempId } = UserAuth();

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  useEffect(() => {
    if (!userTempId)
      navigate('/sessionError');
  })

  if (userTempId) {
    return (
      <>
        <Title titleString="Cá nhân" />

        <RootStyle>
          <HeaderStyle>
            {smUp && (
              <Typography variant="body2" sx={{ mt: { md: -2 } }}>
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
                Thay đổi mật khẩu.
              </Typography>

              <Typography sx={{ color: 'text.secondary', mb: 5 }}>Hãy ghi nhớ mật khẩu của bạn cho lần đăng nhập sau nhé.</Typography>

              <ResetPasswordForm userTempId={userTempId} />

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
                <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                  Already have an account?{' '}
                  <Link variant="subtitle2" to="/login" component={RouterLink}>
                    Login
                  </Link>
                </Typography>
              )}
            </ContentStyle>
          </Container>
        </RootStyle>
      </>
    );
  }
}
