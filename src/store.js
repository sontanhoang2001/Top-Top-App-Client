import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from '~/components/customizedSnackbars/snackbarSlice'
import currentPageReducer from '~/router/routerPathSlice'
import authReducer from './context/authSlice';
import dialogReducer from '~/components/customizedDialog/dialogSlice';
import videoReducer from '~/components/Layout/Video/videoSlice';

export default configureStore({
  reducer: {
    snackbar: snackbarReducer,
    currentPage: currentPageReducer,
    auth: authReducer,
    dialog: dialogReducer,
    video: videoReducer
  },
});
