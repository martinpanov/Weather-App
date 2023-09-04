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
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                        <li className={styles["aside__weather-time-list-item"]} key={index}>
                            <span className={styles["aside__weather-time"]}>{day}</span>
                            <img src="" alt="" />
                            <span className={styles["aside__weather-degrees"]}>18&deg;</span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}