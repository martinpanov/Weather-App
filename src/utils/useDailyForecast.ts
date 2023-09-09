import { useEffect, useState } from "react";

interface FiveDaysWeather {
    degrees: number,
    time: string,
    date: string,
    weather: string,
    icon: string;
}

interface AverageDegrees {
    date: string;
    degrees: number;
    icon: string;
}

// Doing all this because the API returns the weather data in interval of 3 hours and it doesn't return daily weather data
// so I have to filter the weather data and receive only the unique dates, this way, I'm able to create the daily forecast.

export default function getDailyForecast(fiveDaysWeather: FiveDaysWeather[]) {
    const [dailyForecast, setDailyForecast] = useState<AverageDegrees[]>([]);

    useEffect(() => {
        const calculateDailyForecast = () => {
            const newDailyForecast: any = {};

            fiveDaysWeather.forEach((weather) => {
                if (!newDailyForecast.hasOwnProperty(weather.date)) {
                    newDailyForecast[weather.date] = { icon: weather.icon, degrees: [] };
                }

                if (weather.time === '09:00 AM') {
                    newDailyForecast[weather.date].icon = weather.icon;
                }

                newDailyForecast[weather.date].degrees.push(weather.degrees);
            });

            const averageDegrees = Array.from(Object.entries(newDailyForecast).map(([date, degreesArrayAndIcon]: [string, any]) => ({
                date,
                degrees: Number((degreesArrayAndIcon.degrees.reduce((acc: number, degrees: number) => acc + degrees, 0) / degreesArrayAndIcon.degrees.length).toFixed(0)),
                icon: degreesArrayAndIcon.icon,
            }))
            );

            setDailyForecast(averageDegrees);
        };

        calculateDailyForecast();
    }, [fiveDaysWeather]);

    return dailyForecast;
}