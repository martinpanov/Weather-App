import { useEffect } from 'react';
import styles from './MainWeatherInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentWeatherData } from '../../currentWeatherSlice';
import { AppDispatch, RootState } from '../../store';

export default function MainWeatherInfo() {
    const cityName = 'Plovdiv';
    const dispatch: AppDispatch = useDispatch();
    const currentWeatherDetails = useSelector((state: RootState) => state.currentWeather);
    const loading = useSelector((state: RootState) => state.currentWeather.loading);
    const error = useSelector((state: RootState) => state.currentWeather.error);

    useEffect(() => {
        dispatch(fetchCurrentWeatherData(cityName));
    }, [dispatch, cityName]);

    return (
        <>
            {loading ? <img src="./loading.svg" alt="loading" /> : (
                <main className={styles["main"]}>
                    <h3 className={styles["main__logo"]}>Weather App</h3>
                    <div className={styles["main__weather-details"]}>
                        <h2 className={styles["main__degrees"]}>{currentWeatherDetails.degrees}&deg;</h2>
                        <div className={styles["main__city-info"]}>
                            <h1 className={styles["main__city"]}>{cityName}</h1>
                            <p className={styles["main__time"]}>{currentWeatherDetails.time} {currentWeatherDetails.date}</p>
                        </div>
                        <div className={styles["main__weather-info"]}>
                            <img className={styles["main__weather-image"]} src={currentWeatherDetails.icon} alt="weather" />
                            <span className={styles["main__weather"]}>{currentWeatherDetails.weather}</span>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
}