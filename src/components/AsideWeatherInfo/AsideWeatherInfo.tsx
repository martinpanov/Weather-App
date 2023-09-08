import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect } from 'react';
import getDailyForecast from '../../utils/getDailyForecast';
import styles from './AsideWeatherInfo.module.css';
import Form from './Form/Form';
import toast from 'react-hot-toast';

interface FiveDaysWeather {
    degrees: number,
    time: string,
    date: string,
    precipitation: number,
    weather: string,
    icon: string;
}

interface WeatherDetails {
    name: string;
    value: number;
    unit: string;
}

export default function WeatherInfo() {
    let weatherDetails: WeatherDetails[] = [];
    let todaysWeather: FiveDaysWeather[] = [];

    const { fiveDaysWeather, loading, error: fiveDaysError } = useSelector((state: RootState) => state.fiveDaysWeather);
    const { currentWeather, error: currentWeatherError } = useSelector((state: RootState) => state.currentWeather);

    const dailyForecast = getDailyForecast(fiveDaysWeather);

    useEffect(() => {
        if (fiveDaysError.message === currentWeatherError.message) {
            toast.error(fiveDaysError.message);
        } else {
            toast.error(fiveDaysError.message);
            toast.error(currentWeatherError.message);
        }
    }, [fiveDaysError]);


    if (fiveDaysWeather.length > 0 && currentWeather.humidity && currentWeather.wind) {
        const filteredTodaysWeather = fiveDaysWeather.filter((weather: FiveDaysWeather) => weather.date === fiveDaysWeather[0].date);
        weatherDetails = [
            {
                name: 'High',
                value: Math.max(...filteredTodaysWeather.map((weather: FiveDaysWeather) => weather.degrees)),
                unit: '°'
            },
            {
                name: 'Low',
                value: Math.min(...filteredTodaysWeather.map((weather: FiveDaysWeather) => weather.degrees)),
                unit: '°'
            },
            {
                name: 'Humidity',
                value: currentWeather.humidity,
                unit: '%'
            },
            {
                name: 'Wind',
                value: currentWeather.wind,
                unit: 'km/h'
            },
            {
                name: 'Precipitation',
                value: filteredTodaysWeather[0].precipitation,
                unit: '%'
            }
        ];
        todaysWeather = filteredTodaysWeather;
    }

    return (
        <aside className={styles["aside"]}>
            <Form />
            <div className={styles["aside__weather-details"]}>
                <h2 className={styles["aside__weather-info-title"]}>Weather Details</h2>
                <ul className={styles["aside__weather-info-list"]} role='list'>
                    {weatherDetails.map((detail) => {
                        return (
                            <li className={styles["aside__weather-info-list-item"]} key={detail.name}>
                                {loading ? <div className={`${styles["aside__skeleton-text"]} ${styles["aside--skeleton"]}`}></div>
                                    :
                                    <>
                                        <span className={styles["aside__weather-info-type"]}>{detail.name}</span>
                                        <span className={styles["aside__weather-info-value"]}>{detail.value}{detail.unit}</span>
                                    </>
                                }
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className={styles["aside__weather-details"]}>
                <h2 className={styles["aside__weather-info-title"]}>Today's Forecast</h2>
                {loading ? <div className={`${styles["aside__skeleton-today-weather"]} ${styles["aside--skeleton"]}`}></div>
                    :
                    <ul className={styles["aside__weather-time-list"]} role='list'>
                        {todaysWeather.map((weather: FiveDaysWeather, index) => (
                            <li className={styles["aside__weather-time-list-item"]} key={index}>
                                <span className={styles["aside__weather-time"]}>{weather.time}</span>
                                <img src={weather.icon} alt="weather" />
                                <span className={styles["aside__weather-degrees"]}>{weather.degrees}&deg;</span>
                            </li>
                        ))}
                    </ul>
                }
            </div>
            <div className={styles["aside__weather-details"]}>
                <h2 className={styles["aside__weather-info-title"]}>Daily Forecast</h2>
                {loading ? <div className={`${styles["aside__skeleton-daily-weather"]} ${styles["aside--skeleton"]}`}></div>
                    :
                    <ul className={styles["aside__weather-time-list"]} role='list'>
                        {dailyForecast.map((weather, index) => (
                            <li className={styles["aside__weather-time-list-item"]} key={index}>
                                <span className={styles["aside__weather-time"]}>{weather.date}</span>
                                <img src={weather.icon} alt="weather" />
                                <span className={styles["aside__weather-degrees"]}>{weather.degrees}&deg;</span>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </aside>
    );
}