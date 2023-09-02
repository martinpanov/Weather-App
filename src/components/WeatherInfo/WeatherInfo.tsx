export default function WeatherInfo() {
    return (
        <aside>
            <form action="">
                <input type="text" />
                <select name="city" id="city">
                    <option value="sofia">Sofia</option>
                </select>
                <button>Search</button>
            </form>
            <div>
                <h2>Weather Details</h2>
                <ul>
                    <li>
                        <span>High</span>
                        <span>20&deg;</span>
                    </li>
                    <li>
                        <span>Low</span>
                        <span>12&deg;</span>
                    </li>
                    <li>
                        <span>Humidity</span>
                        <span>60&#37;</span>
                    </li>
                    <li>
                        <span>Wind</span>
                        <span>5 km/h</span>
                    </li>
                </ul>
            </div>
            <div>
                <h2>Hourly Forecast</h2>
                <ul>
                    {[1, 2, 3, 4, 5, 6].map((listItem, index) => (
                        <li key={index}>
                            <span></span>
                            <img src="" alt="" />
                            <span></span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Daily Forecast</h2>
                <ul>
                    {[1, 2, 3, 4, 5, 6].map((listItem, index) => (
                        <li key={index}>
                            <span></span>
                            <img src="" alt="" />
                            <span></span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}