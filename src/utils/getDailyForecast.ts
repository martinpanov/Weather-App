interface FiveDaysWeather {
    degrees: number,
    time: string,
    date: string,
    weather: string,
    icon: string;
}

// Doing all this because the API returns the weather data in interval of 3 hours and it doesn't return daily weather data
// so I have to filter the weather data and receive only the unique dates, this way, I'm able to create the daily forecast.

export default function getDailyForecast(fiveDaysWeather: FiveDaysWeather[]) {
    const dailyForecast: any = {};

    fiveDaysWeather.forEach((weather: FiveDaysWeather) => {
        if (!dailyForecast.hasOwnProperty(weather.date)) {
            dailyForecast[weather.date] = { icon: weather.icon, degrees: [] };
        }

        if (weather.time === '09:00 AM') {
            dailyForecast[weather.date].icon = weather.icon;
        }

        dailyForecast[weather.date].degrees.push(weather.degrees);
    });

    const averageDegrees = Array.from(Object.entries(dailyForecast)).map(([date, degreesArrayAndIcon]: [string, any]) => ({
        date,
        degrees: (degreesArrayAndIcon.degrees.reduce((acc: number, degrees: number) => acc + degrees, 0) / degreesArrayAndIcon.degrees.length).toFixed(0),
        icon: degreesArrayAndIcon.icon
    }));

    return averageDegrees;
}