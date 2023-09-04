import { useEffect } from 'react';
import styles from './WeatherInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiveDaysWeatherData } from '../../fiveDaysWeatherSlice';
import { AppDispatch, RootState } from '../../store';

interface FiveDaysWeather {
    degrees: string,
    time: string,
    date: string,
    weather: string,
    icon: string;
}

export default function WeatherInfo() {
    const cityName = 'Plovdiv';
    const dispatch: AppDispatch = useDispatch();
    const { fiveDaysWeather, loading, error } = useSelector((state: RootState) => state.fiveDaysWeather);
    const currentWeatherDetails = useSelector((state: RootState) => state.currentWeather);

    const todaysWeather = fiveDaysWeather.filter((weather: FiveDaysWeather) => weather.date === new Date().toLocaleDateString('en-GB'));
    const todaysDegreesHigh = Math.max(...todaysWeather.map((weather: FiveDaysWeather) => Number(weather.degrees)));
    const todaysDegreesLow = Math.min(...todaysWeather.map((weather: FiveDaysWeather) => Number(weather.degrees)));
    const dailyForecast: any = {};

    // Doing all this because the API returns the weather data in interval of 3 hours and it doesn't return daily weather data
    // so I have to filter the weather data and receive only the unique dates, this way, I'm able to create the daily forecast.
    fiveDaysWeather.forEach((weather: FiveDaysWeather) => {
        if (!dailyForecast.hasOwnProperty(weather.date)) {
            dailyForecast[weather.date] = { icon: weather.icon, degrees: [] };
        }
        dailyForecast[weather.date].degrees.push(weather.degrees);
    });

    const averageDegrees = Array.from(Object.entries(dailyForecast)).map(([date, degreesArrayAndIcon]: [string, any]) => ({
        date,
        degrees: (degreesArrayAndIcon.degrees.reduce((acc: number, degrees: string) => acc + Number(degrees), 0) / degreesArrayAndIcon.degrees.length).toFixed(0),
        icon: degreesArrayAndIcon.icon
    }));

    useEffect(() => {
        dispatch(fetchFiveDaysWeatherData(cityName));
    }, [dispatch, cityName]);

    return (
        <aside className={styles["aside"]}>
            <form action="">
                <input className={styles["aside__input"]} placeholder='Location' type="text" />
                <button className={styles["aside__search-button"]}><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
            <div className={styles["aside__weather-details"]}>
                <h2 className={styles["aside__weather-info-title"]}>Weather Details</h2>
                <ul className={styles["aside__weather-info-list"]} role='list'>
                    <li className={styles["aside__weather-info-list-item"]}>
                        <span className={styles["aside__weather-info-type"]}>High</span>
                        <span className={styles["aside__weather-info-value"]}>{todaysDegreesHigh}&deg;</span>
                    </li>
                    <li className={styles["aside__weather-info-list-item"]}>
                        <span className={styles["aside__weather-info-type"]}>Low</span>
                        <span className={styles["aside__weather-info-value"]}>{todaysDegreesLow}&deg;</span>
                    </li>
                    <li className={styles["aside__weather-info-list-item"]}>
                        <span className={styles["aside__weather-info-type"]}>Humidity</span>
                        <span className={styles["aside__weather-info-value"]}>{currentWeatherDetails.humidity}&#37;</span>
                    </li>
                    <li className={styles["aside__weather-info-list-item"]}>
                        <span className={styles["aside__weather-info-type"]}>Wind</span>
                        <span className={styles["aside__weather-info-value"]}>{currentWeatherDetails.wind} km/h</span>
                    </li>
                </ul>
            </div>
            <div className={styles["aside__weather-details"]}>
                <h2 className={styles["aside__weather-info-title"]}>Today's Forecast</h2>
                <ul className={styles["aside__weather-time-list"]} role='list'>
                    {todaysWeather.map((listItem: FiveDaysWeather, index) => (
                        <li className={styles["aside__weather-time-list-item"]} key={index}>
                            <span className={styles["aside__weather-time"]}>{listItem.time}</span>
                            <img src={listItem.icon} alt="weather" />
                            <span className={styles["aside__weather-degrees"]}>{listItem.degrees}&deg;</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles["aside__weather-details"]}>
                <h2 className={styles["aside__weather-info-title"]}>Daily Forecast</h2>
                <ul className={styles["aside__weather-time-list"]} role='list'>
                    {averageDegrees.map((weather, index) => (
                        <li className={styles["aside__weather-time-list-item"]} key={index}>
                            <span className={styles["aside__weather-time"]}>{weather.date}</span>
                            <img src={weather.icon} alt="weather" />
                            <span className={styles["aside__weather-degrees"]}>{weather.degrees}&deg;</span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}