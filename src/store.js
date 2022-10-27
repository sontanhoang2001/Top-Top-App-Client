import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from '~/components/customizedSnackbars/snackbarSlice'
import counterReducer from '~/page/Counter/counterSlice'
import currentPageReducer from '~/router/routerPathSlice'
import authReducer from './context/authSlice';

export default configureStore({
  reducer: {
    snackbar: snackbarReducer,
    currentPage: currentPageReducer,
    auth: authReducer,
    counter: counterReducer,
  },
});
