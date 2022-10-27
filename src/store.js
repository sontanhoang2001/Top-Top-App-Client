import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '~/page/Counter/counterSlice'
import currentPageReducer from '~/components/Layout/DefaultLayout/Footer/routerPathSlice'
import authReducer from './context/authSlice';


export default configureStore({
  reducer: {
    currentPage: currentPageReducer,
    auth: authReducer,
    counter: counterReducer,
  },
});
