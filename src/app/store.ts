import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/user/userSlice';
import settingsReducer from '../store/settings/settingsSlice';
import tasksReducer from '../store/tasks/tasksSlice';
import categoriesReducer from '../store/categories/categoriesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
    tasks: tasksReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
