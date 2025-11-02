import styles from './MainWeatherInfo.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { RenderIf } from '../RenderIf/RenderIf';
import { MainWeatherInfoLoadingSkeleton } from './LoadingSkeleton/LoadingSkeleton';

export default function MainWeatherInfo() {
    const { currentWeather, loading } = useSelector((state: RootState) => state.currentWeather);

    return (
        <main className={styles["main"]}>
            <h3 className={styles["main__logo"]}>Weather App</h3>
            <RenderIf condition={loading}>
                <MainWeatherInfoLoadingSkeleton />
            </RenderIf>
            <RenderIf condition={!loading}>
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
            </RenderIf>
        </main>
    );
}