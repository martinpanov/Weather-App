import { configureStore } from '@reduxjs/toolkit';

import currentWeatherReducer from './slices/currentWeatherSlice';
import fiveDaysWeatherReducer from './slices/fiveDaysWeatherSlice';

export const store = configureStore({
  reducer: {
    currentWeather: currentWeatherReducer,
    fiveDaysWeather: fiveDaysWeatherReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
