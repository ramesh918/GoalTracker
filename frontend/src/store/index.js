import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import recordsReducer from './dailyGoalsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    dailyGoals: recordsReducer,
  },
});

export default store;