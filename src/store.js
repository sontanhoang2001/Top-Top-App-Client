import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '~/page/Counter/counterSlice'
import currentPageReducer from '~/components/Layout/DefaultLayout/Footer/routerPathSlice'


export default configureStore({
  reducer: {
    currentPage: currentPageReducer,
    counter: counterReducer,
  },
});
