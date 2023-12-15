import {configureStore} from '@reduxjs/toolkit';
import {dataApi} from './dataApi';
import {alertSlice} from './alertSlice';
import {loaderSlice} from './loaderSlice';
import {controlSlice} from './controlSlice';

export const store = configureStore({
  reducer: {
    [dataApi.reducerPath]: dataApi.reducer,
    alert: alertSlice.reducer,
    loader: loaderSlice.reducer,
    control: controlSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(dataApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
