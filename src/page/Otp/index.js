import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from "react-dom";

import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Box, FormHelperText } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input'
import { LoadingButton } from '@mui/lab';
import { Button } from "@mui/material";

// hooks
import { Controller, useForm } from "react-hook-form";
import useResponsive from '../../hooks/useResponsive';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { openSnackbar } from "~/components/customizedSnackbars/snackbarSlice";
import { selectDirection } from "~/router/routerPathSlice";

// api
import apiAccount from '~/api/account'

// auth provider
import { UserAuth } from '~/context/AuthContext';
import Title from '~/components/title';

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

export default function Otp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const direction = useSelector(selectDirection);
  const { userTempId } = UserAuth();

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      otp: ""
    }
  });

  const onSubmit = async (data) => {
    const dataRequest = {
      "id": userTempId,
      "otp": data.otp
    };

    await apiAccount.verifyOtp(dataRequest)
      .then(() => {
        const snackBarPayload = { type: 'success', message: 'Bạn đã xác thực tài khoản thành công!', duration: 10000 };
        dispatch(openSnackbar(snackBarPayload))

        // chuyển trang
        navigate(direction);
      })
      .catch(error => {
        console.log(error);
        const snackBarPayload = { type: 'error', message: 'Mã OTP vừa nhập chưa chính xác!' };
        dispatch(openSnackbar(snackBarPayload))
      });

  };

  if (!userTempId) {
    navigate("/404")
  } else {
    return (
      <>
        <Title titleString="Xác thực OTP" />


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
            <SectionStyle>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Chào mừng đến với mạng xã hội TopTop
              </Typography>
              <img src="/static/illustrations/illustration_login.png" alt="login" />
            </SectionStyle>
          )}

          <Container maxWidth="sm">
            <ContentStyle>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: '700' }}>
                Xác nhận mã OTP
              </Typography>

              <Typography sx={{ color: 'text.secondary', mb: 5 }}>Chúng tôi đã gửi cho bạn mã OTP qua hộp thư điện tử mail của bạn, vui lòng kiểm tra và hoàn thành xác thực.</Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="otp"
                  control={control}
                  rules={{ validate: (value) => value.length === 6 }}
                  render={({ field, fieldState }) => (
                    <Box>
                      <MuiOtpInput sx={{ gap: 1 }} {...field} length={6} />
                      {fieldState.invalid ? (
                        <FormHelperText sx={{ mt: 1 }} error>OTP vừa nhập không hợp lệ!</FormHelperText>
                      ) : null}
                    </Box>
                  )}
                />
                <div>
                  <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 2 }}>
                    Xác nhận
                  </LoadingButton>
                </div>
              </form>

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
      </>
    );

  }
}
