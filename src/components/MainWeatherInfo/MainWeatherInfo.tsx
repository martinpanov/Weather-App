import styles from './MainWeatherInfo.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function MainWeatherInfo() {
    const { currentWeather, loading } = useSelector((state: RootState) => state.currentWeather);

    return (
        <>

            <main className={styles["main"]}>
                <h3 className={styles["main__logo"]}>Weather App</h3>
                {loading ?
                    (
                        <div className={styles["main__skeleton-wrapper"]}>
                            <div className={`${styles["main__skeleton-degrees"]} ${styles["main--loading"]}`}></div>
                            <div className={styles["main__skeleton"]}>
                                <div className={`${styles["main__skeleton-city"]} ${styles["main--loading"]}`}></div>
                                <div className={`${styles["main__skeleton-time"]} ${styles["main--loading"]}`}></div>
                            </div>
                            <div className={styles["main__skeleton"]}>
                                <div className={`${styles["main__skeleton-image"]} ${styles["main--loading"]}`}></div>
                                <div className={`${styles["main__skeleton-weather"]} ${styles["main--loading"]}`}></div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className={styles["main__weather-details"]}>
                            <h2 className={styles["main__degrees"]}>{currentWeather.degrees}&deg;</h2>
                            <div className={styles["main__city-info"]}>
                                <h1 className={styles["main__city"]}>{currentWeather.cityName}</h1>
                                <p className={styles["main__time"]}>{currentWeather.time} {currentWeather.date}</p>
                            </div>
                            <div className={styles["main__weather-info"]}>
                                <img className={styles["main__weather-image"]} src={currentWeather.icon} alt="weather" />
                                <span className={styles["main__weather"]}>{currentWeather.weather}</span>
                            </div>
                        </div>
                    )}
            </main>
        </>
    );
}