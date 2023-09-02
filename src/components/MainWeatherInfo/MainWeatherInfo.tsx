import styles from './MainWeatherInfo.module.css';

export default function MainWeatherInfo() {
    return (
        <main>
            <img className={styles["main__background-image"]} src="./day-cloudy.jpg" alt="day-cloudy" />
            <h3>Weather App</h3>
            <div>
                <h2>16&deg;</h2>
                <div>
                    <h1>London</h1>
                    <p>06:09 - Monday, 9 Sep '23</p>
                </div>
                <div>
                    <img src="" alt="" />
                    <span>Cloudy</span>
                </div>
            </div>
        </main>
    );
}