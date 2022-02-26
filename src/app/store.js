import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/appSlice';
import globalReducer from '../features/globalSlice';

export const store = configureStore({
   reducer: {
      app: appReducer,
      global: globalReducer,
   },
});
