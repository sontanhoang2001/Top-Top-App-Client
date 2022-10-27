import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// components
import Iconify from '~/components/Iconify';
import { FormProvider, RHFTextField } from '~/components/hook-form';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUserId } from '~/context/authSlice'
import { openSnackbar } from "~/components/customizedSnackbars/snackbarSlice";

// api
import accountApi from '~/api/account'
// ----------------------------------------------------------------------

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useDispatch(selectUserId);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,15}$/

  const RegisterSchema = Yup.object().shape({
    password: Yup.string()
      .matches(REGEX_PASSWORD, 'Mật khẩu phải trên 8 ký tự tối đã 15 ký tự, phải có số và ít nhất một chữ cái in hoa'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], 'Nhập lại mật khẩu không khớp!')
      .required("Bạn chưa nhập lại mật khẩu!")
  });

  const defaultValues = {
    password: '',
    confirmPassword: ''
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const confirmPassword = data.confirmPassword;

    const dataRequest = { id: userId, password: confirmPassword };
    await accountApi.resetPassword(data)
      .then(res => {

        setIsSubmitting(false);
        const snackBarPayload = { type: 'error', message: 'Bạn đã đổi mật khẩu thành công!', duration: 8000 };
        dispatch(openSnackbar(snackBarPayload))
      })
      .catch(error => {
        console.log(error);
        const snackBarPayload = { type: 'error', message: 'Đã gặp sự cố!' };
        dispatch(openSnackbar(snackBarPayload))
        setIsSubmitting(false);
      });
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>

        <RHFTextField
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Nhập lại mật khẩu"
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Lưu thay đổi
        </LoadingButton>

      </Stack>
    </FormProvider>
  );
}
