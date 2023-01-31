import { useEffect, useState } from 'react';
import {
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '~/firebase/config';

// material
import { Stack, Button, Divider, Typography } from '@mui/material';
// component
import Iconify from '~/components/Iconify';

// auth provider
import { UserAuth } from '~/context/AuthContext';

// redux
import { useDispatch } from 'react-redux';
import { openSnackbar } from "~/components/customizedSnackbars/snackbarSlice";

// api
import accountApi from '~/api/account'

// ----------------------------------------------------------------------

export default function AuthSocial() {
  const dispatch = useDispatch();
  const { googleSignIn, facebookSignIn, user } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const loginOrRegisterSocial = async (socialLogin) => {
    const { email, displayName, photoURL } = socialLogin;
    let snackBarPayload = {};
    const resquest = {
      email: email,
      fullName: displayName,
      avatar: photoURL,
      alias: null,
      role: 5,
      active: true
    };

    await accountApi.loginOrRegisterSocial(resquest)
      .then(res => {
        // save token in localStorage
        const token = res.data.access_token;
        window.localStorage.setItem("token", token);

        window.location = "/";
      })
      .catch(error => {
        if (error.response) {
          snackBarPayload = { type: 'error', message: 'Đăng nhập không thành công!' };
          console.log('Error', error.message);
        }
        console.log("error login: ", error)
      });
    dispatch(openSnackbar(snackBarPayload))
  };

const [socialLogin, setSocialLogin] = useState();
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
        setSocialLogin(currentUser);
    });

    if(socialLogin) {
      loginOrRegisterSocial(socialLogin);
    }

    return () => {
        unsubcribe();
    };
}, [socialLogin]);

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleGoogleSignIn}>
          <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
        </Button>
        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleFacebookSignIn}>
          <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Hoặc
        </Typography>
      </Divider>
    </>
  );
}
