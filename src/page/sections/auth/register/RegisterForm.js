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
import { useDispatch } from 'react-redux';
import { setDirection } from '~/router/routerPathSlice'
import { openSnackbar } from "~/components/customizedSnackbars/snackbarSlice";

// api
import accountApi from '~/api/account'

// ----------------------------------------------------------------------

export default function RegisterForm({ setUserTempId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const REGEX_PASSWORD = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(8, 'Tên của bạn phải ít nhất 8 ký tự!')
      .max(30, 'Tên tối đa 30 ký tự!')
      .required('Bạn chưa nhập tên!'),
    email: Yup.string().email('Email vừa nhập chưa đúng định dạng!').required('Bạn chưa nhập email!'),
    password: Yup.string()
      .matches(REGEX_PASSWORD, 'Mật khẩu phải trên 8 ký tự tối đã 16 ký tự, phải có số và ít nhất một chữ cái in hoa, không có khoản trắng, ít nhất một ký tự đặt biệt'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], 'Nhập lại mật khẩu không khớp!')
      .required("Bạn chưa nhập lại mật khẩu!")
  });

  const defaultValues = {
    fullName: '',
    email: '',
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

    const email = data.email;

    // method check trung email
    await accountApi.checkEmail(email, null)
      .then(res => {
        if (res.data.result) {
          setIsSubmitting(false);
          const snackBarPayload = { type: 'error', message: 'Email bạn vừa nhập đã tồn tại trong hệ thống!' };
          dispatch(openSnackbar(snackBarPayload))
          setIsSubmitting(false);
        } else {
          handleRegister(data);
        }
      })
      .catch(error => {
        console.log(error);
        const snackBarPayload = { type: 'error', message: 'Đã gặp sự cố!' };
        dispatch(openSnackbar(snackBarPayload))
        setIsSubmitting(false);
      });
  }

  const handleRegister = async (data) => {
    setIsSubmitting(true);
    const dataRegister = {
      "email": data.email,
      "fullName": data.fullName,
      "password": data.confirmPassword,
      "avatar": null,
      "history": null,
      "alias": null,
      "role": 5,
      "active": false
    };

    await accountApi.register(dataRegister)
      .then(res => {
        const userId = res.data.id;
        setUserTempId(userId);

        const snackBarPayload = { type: 'success', message: 'Bạn đã đăng ký tài khoản thành công!', duration: 10000 };
        dispatch(openSnackbar(snackBarPayload))

        dispatch(setDirection({ direction: '/login' }));
        navigate('/otp');
      })
      .catch(error => {
        console.log(error);
        const snackBarPayload = { type: 'error', message: 'Đã gặp sự cố!' };
        dispatch(openSnackbar(snackBarPayload))
      });
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>

        <RHFTextField name="fullName" label="Tên đầy đủ" />
        <RHFTextField name="email" label="Email" />

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
          Đăng ký
        </LoadingButton>

      </Stack>
    </FormProvider>
  );
}
