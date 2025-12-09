import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dreamsReducer from './slices/dreamsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dreams: dreamsReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;