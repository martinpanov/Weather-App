export type FiveDaysWeather = {
  degrees: number;
  time: string;
  date: string;
  precipitation: number;
  weather: string;
  icon: string;
};

export type DailyForecast = {
  date: string;
  degrees: number;
  icon: string;
};

export type CurrentWeather = {
  cityName: string;
  degrees: number;
  humidity: number;
  wind: number;
  time: string;
  date: string;
  weather: string;
  icon: string;
};
