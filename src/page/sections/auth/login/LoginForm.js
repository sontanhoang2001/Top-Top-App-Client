import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// components
import Iconify from '~/components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '~/components/hook-form';

// auth provider
import { UserAuth } from '~/context/AuthContext';

// ----------------------------------------------------------------------

export default function LoginForm({ socialLogin }) {
  const { login } = UserAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup
      .string()
      .email('Email vừa nhập chưa đúng định dạng!')
      .required('Bạn chưa nhập Email!'),
    password: Yup.string()
      .required('Bạn chưa nhập mật khẩu!'),
  });

  // load remember
  // const getRemember = window.localStorage?.getItem("remember");
  // const rememberUser = JSON.parse(getRemember);

  const defaultValues = {
    email: "",
    password: "",
    remember: true,
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
    const password = methods.getValues("password");
    const remember = methods.getValues("remember");


    // ghi nhớ cho lần đăng nhập tiếp theo
    if (remember) {
      window.localStorage.setItem("remember", JSON.stringify({ email: email, password: password }))
    }

    try {
      await login(email, password)
      setIsSubmitting(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email" />

        <RHFTextField
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Ghi nhớ tài khoản" />
        <Link variant="subtitle2" underline="hover" component={RouterLink} to="/forgotpassword">
          Quên mật khẩu?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Đăng Nhập
      </LoadingButton>
    </FormProvider>
  );
}
