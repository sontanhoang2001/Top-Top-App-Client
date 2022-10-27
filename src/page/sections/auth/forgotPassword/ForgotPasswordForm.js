import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// components
import Iconify from '~/components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '~/components/hook-form';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setUserId } from '~/context/authSlice'
import { openSnackbar } from "~/components/customizedSnackbars/snackbarSlice";

import accountApi from '~/api/account';

// ----------------------------------------------------------------------

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup
      .string()
      .email('Email vừa nhập chưa đúng định dạng!')
      .required('Bạn chưa nhập Email!'),
  });

  const defaultValues = {
    email: ""
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit
  } = methods;

  const onSubmit = async () => {
    setIsSubmitting(true)
    const email = methods.getValues("email");


    await accountApi.forgotPassword(email)
      .then(res => {
        const payload = { userId: res.data.id }
        dispatch(setUserId(payload));

        const snackBarPayload = { type: 'success', message: 'Bạn đã xác nhận email thành công!', duration: 8000 };
        dispatch(openSnackbar(snackBarPayload))
        navigate('/otp');
      })
      .catch(error => {
        console.log(error);
        const snackBarPayload = { type: 'error', message: 'Đã gặp sự cố!' };
        dispatch(openSnackbar(snackBarPayload))
      });
    setIsSubmitting(false);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email" />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 2 }}>
        Đăng Nhập
      </LoadingButton>
    </FormProvider>
  );
}
