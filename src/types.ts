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