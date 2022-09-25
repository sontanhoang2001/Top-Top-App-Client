import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '~/page/Counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
