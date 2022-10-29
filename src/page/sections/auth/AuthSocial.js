// material
import { Stack, Button, Divider, Typography } from '@mui/material';
import { useEffect } from 'react';
// component
import Iconify from '~/components/Iconify';

// auth provider
import { UserAuth } from '~/context/AuthContext';

// ----------------------------------------------------------------------

export default function AuthSocial() {
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

  useEffect(() => {
    if (user) {
      console.log('user: ', user);
      const { displayName, email } = user;
      console.log(`Data: name: ${displayName}, email: ${email}`);
    }

  }, [user]);

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
