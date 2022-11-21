import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from '~/components/customizedSnackbars/snackbarSlice'
import currentPageReducer from '~/router/routerPathSlice'
import authReducer from './context/authSlice';
import dialogReducer from '~/components/customizedDialog/dialogSlice';
import videoReducer from '~/components/Layout/Video/videoSlice';
import chatReducer from '~/page/Chat/chatSlice';
import commentReducer from '~/components/comment/commentSlice';


export default configureStore({
  reducer: {
    snackbar: snackbarReducer,
    currentPage: currentPageReducer,
    auth: authReducer,
    dialog: dialogReducer,
    video: videoReducer,
    chat: chatReducer,
    comment: commentReducer
  },
});
