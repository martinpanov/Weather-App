import { useEffect, useState } from 'react';
import styles from './WeatherInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiveDaysWeatherData } from '../../features/fiveDaysWeatherSlice';
import { AppDispatch, RootState } from '../../store';
import { fetchCurrentWeatherData } from '../../features/currentWeatherSlice';
import getDailyForecast from '../../utils/getDailyForecast';

interface FiveDaysWeather {
    degrees: string,
    time: string,
    date: string,
    precipitation: string,
    weather: string,
    icon: string;
}

export default function WeatherInfo() {
    const [cityName, setCityName] = useState('Plovdiv');
    const dispatch: AppDispatch = useDispatch();
    const { fiveDaysWeather, loading, error } = useSelector((state: RootState) => state.fiveDaysWeather);
    const currentWeatherDetails = useSelector((state: RootState) => state.currentWeather);

    const todaysWeather = fiveDaysWeather.filter((weather: FiveDaysWeather) => weather.date === new Date().toLocaleDateString('en-GB'));
    const todaysDegreesHigh = Math.max(...todaysWeather.map((weather: FiveDaysWeather) => Number(weather.degrees)));
    const todaysDegreesLow = Math.min(...todaysWeather.map((weather: FiveDaysWeather) => Number(weather.degrees)));

    const dailyForecast = getDailyForecast(fiveDaysWeather);

    useEffect(() => {
        dispatch(fetchFiveDaysWeatherData(cityName));
        dispatch(fetchCurrentWeatherData(cityName));
    }, []);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(fetchFiveDaysWeatherData(cityName));
        dispatch(fetchCurrentWeatherData(cityName));
    };

    return (
        <aside className={styles["aside"]}>
            <form action="" onSubmit={handleSubmit}>
                <input className={styles["aside__input"]} placeholder='Location' type="text" onChange={(e) => setCityName(e.target.value)} />
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
                    <li className={styles["aside__weather-info-list-item"]}>
                        <span className={styles["aside__weather-info-type"]}>Precipitation</span>
                        {/* @ts-ignore */}
                        <span className={styles["aside__weather-info-value"]}>{todaysWeather[0].precipitation * 100}%</span>
                    </li>
                </ul>
            </div>
            <div className={styles["aside__weather-details"]}>
                <h2 className={styles["aside__weather-info-title"]}>Today's Forecast</h2>
                <ul className={styles["aside__weather-time-list"]} role='list'>
                    {todaysWeather.map((weather: FiveDaysWeather, index) => (
                        <li className={styles["aside__weather-time-list-item"]} key={index}>
                            <span className={styles["aside__weather-time"]}>{weather.time}</span>
                            <img src={weather.icon} alt="weather" />
                            <span className={styles["aside__weather-degrees"]}>{weather.degrees}&deg;</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles["aside__weather-details"]}>
                <h2 className={styles["aside__weather-info-title"]}>Daily Forecast</h2>
                <ul className={styles["aside__weather-time-list"]} role='list'>
                    {dailyForecast.map((weather, index) => (
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