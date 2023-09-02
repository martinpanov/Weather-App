import styles from './WeatherInfo.module.css';

export default function WeatherInfo() {
    return (
        <aside className={styles["aside"]}>
            <form action="">
                <input className={styles["aside__input"]} placeholder='Location' type="text" />
                {/* <select name="city" id="city">
                    <option value="sofia">Sofia</option>
                </select> */}
                <button className={styles["aside__search-button"]}><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
            <div className={styles["aside__weather-details"]}>
                <h2 className={styles["aside__weather-info-title"]}>Weather Details</h2>
                <ul className={styles["aside__weather-info-list"]} role='list'>
                    <li className={styles["aside__weather-info-list-item"]}>
                        <span className={styles["aside__weather-info-type"]}>High</span>
                        <span className={styles["aside__weather-info-value"]}>20&deg;</span>
                    </li>
                    <li className={styles["aside__weather-info-list-item"]}>
                        <span className={styles["aside__weather-info-type"]}>Low</span>
                        <span className={styles["aside__weather-info-value"]}>12&deg;</span>
                    </li>
                    <li className={styles["aside__weather-info-list-item"]}>
                        <span className={styles["aside__weather-info-type"]}>Humidity</span>
                        <span className={styles["aside__weather-info-value"]}>60&#37;</span>
                    </li>
                    <li className={styles["aside__weather-info-list-item"]}>
                        <span className={styles["aside__weather-info-type"]}>Wind</span>
                        <span className={styles["aside__weather-info-value"]}>5 km/h</span>
                    </li>
                </ul>
            </div>
            <div className={styles["aside__weather-details"]}>
                <h2 className={styles["aside__weather-info-title"]}>Hourly Forecast</h2>
                <ul className={styles["aside__weather-info-list"]} role='list'>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((listItem, index) => (
                        <li key={index}>
                            <span className={styles["aside__weather-info-type"]}>{listItem}:00 PM</span>
                            <img src="" alt="" />
                            <span className={styles["aside__weather-info-value"]}>18&deg;</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles["aside__weather-details"]}>
                <h2 className={styles["aside__weather-info-title"]}>Daily Forecast</h2>
                <ul className={styles["aside__weather-info-list"]} role='list'>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                        <li key={index}>
                            <span className={styles["aside__weather-info-type"]}>{day}</span>
                            <img src="" alt="" />
                            <span className={styles["aside__weather-info-value"]}>18&deg;</span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}