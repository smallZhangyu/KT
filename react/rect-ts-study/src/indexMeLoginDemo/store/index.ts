import { configureStore } from '@reduxjs/toolkit';
import meReducer from './me';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    myInfo: meReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
