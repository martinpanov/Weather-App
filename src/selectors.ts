import { RootState } from './store';

export const getFiveDaysWeather = (state: RootState) => {
  return state.fiveDaysWeather.fiveDaysWeather;
};

export const getFiveDaysWeatherLoading = (state: RootState) => {
  return state.fiveDaysWeather.loading;
};

export const getCurrentWeather = (state: RootState) => {
  return state.currentWeather.currentWeather;
};

export const getCurrentWeatherLoading = (state: RootState) => {
  return state.currentWeather.loading;
};
