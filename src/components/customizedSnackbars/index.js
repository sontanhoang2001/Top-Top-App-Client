import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { closeSnackbar, selectEnable, selectType, selectMessage } from './snackbarSlice';

function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const enable = useSelector(selectEnable)
  const type = useSelector(selectType)
  const message = useSelector(selectMessage)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar())
  };

  // console.log('re-render: ', enable)

  setTimeout(() => {
    dispatch(closeSnackbar())
  }, 3000)

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={enable} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type || 'success'} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default CustomizedSnackbars;
