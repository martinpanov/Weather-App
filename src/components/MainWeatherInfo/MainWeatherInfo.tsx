import styles from './MainWeatherInfo.module.css';

export default function MainWeatherInfo() {
    return (
        <main className={styles["main"]}>
            <h3 className={styles["main__logo"]}>Weather App</h3>
            <div className={styles["main__weather-details"]}>
                <h2 className={styles["main__degrees"]}>16&deg;</h2>
                <div className={styles["main__city-info"]}>
                    <h1 className={styles["main__city"]}>London</h1>
                    <p className={styles["main__time"]}>06:09 - Monday, 9 Sep '23</p>
                </div>
                <div className={styles["main__weather-info"]}>
                    <img className={styles["main__weather-image"]} src="https://www.clipartmax.com/png/small/102-1028872_weather-partly-cloudy-rain-icon-weather-icon.png" alt="Weather Partly Cloudy Rain Icon - Weather Icon @clipartmax.com" />
                    <span className={styles["main__weather"]}>Cloudy</span>
                </div>
            </div>
        </main>
    );
}