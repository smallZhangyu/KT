import { configureStore } from '@reduxjs/toolkit';
import meReducer from './me';

const store = configureStore({
  reducer: {
    myInfo: meReducer,
  },
});

export default store;
