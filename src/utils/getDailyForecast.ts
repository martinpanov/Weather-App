import { FiveDaysWeather } from '../types';

// Doing all this because the API returns the weather data in interval of 3 hours and it doesn't return daily weather data
// so I have to filter the weather data and receive only the unique dates, this way, I'm able to create the daily forecast.

export default function getDailyForecast(fiveDaysWeather: FiveDaysWeather[]) {
  const newDailyForecast: Record<string, { degrees: number[]; icon: string }> =
    {};

  fiveDaysWeather.forEach((weather) => {
    if (!(weather.date in newDailyForecast)) {
      newDailyForecast[weather.date] = { icon: weather.icon, degrees: [] };
    }

    newDailyForecast[weather.date].degrees.push(weather.degrees);
  });

  const dailyForecast = Object.entries(newDailyForecast).map(
    ([date, degreesArrayAndIcon]) => ({
      date,
      degrees: Number(
        (
          degreesArrayAndIcon.degrees.reduce(
            (acc, degrees) => acc + degrees,
            0
          ) / degreesArrayAndIcon.degrees.length
        ).toFixed(0)
      ),
      icon: degreesArrayAndIcon.icon,
    })
  );

  return dailyForecast;
}
