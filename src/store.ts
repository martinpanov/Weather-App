import { configureStore } from "@reduxjs/toolkit";
import currentWeatherReducer from "./weatherSlice";

export const store = configureStore({
    reducer: {
        currentWeather: currentWeatherReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;