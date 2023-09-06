import { useEffect, useState } from 'react';
import styles from './AsideWeatherInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiveDaysWeatherData } from '../../features/fiveDaysWeatherSlice';
import { AppDispatch, RootState } from '../../store';
import { fetchCurrentWeatherData } from '../../features/currentWeatherSlice';
import getDailyForecast from '../../utils/getDailyForecast';
import citiesData from "../../../city.list.json";

interface FiveDaysWeather {
    degrees: number,
    time: string,
    date: string,
    precipitation: number,
    weather: string,
    icon: string;
}

interface Cities {
    id: number;
    name: string;
    state: string;
    country: string;
    coord: {
        lon: number;
        lat: number;
    };
}

interface WeatherDetails {
    name: string;
    value: number;
    unit: string;
}

export default function WeatherInfo() {
    const cities: Cities[] = citiesData as Cities[];

    const [cityName, setCityName] = useState('Plovdiv');
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [weatherDetails, setWeatherDetails] = useState<WeatherDetails[]>([]);
    const [todaysWeather, setTodaysWeather] = useState<FiveDaysWeather[]>([]);

    const dispatch: AppDispatch = useDispatch();
    const { fiveDaysWeather, loading } = useSelector((state: RootState) => state.fiveDaysWeather);
    const { currentWeather } = useSelector((state: RootState) => state.currentWeather);

    const dailyForecast = getDailyForecast(fiveDaysWeather);

    useEffect(() => {
        dispatch(fetchFiveDaysWeatherData(cityName));
        dispatch(fetchCurrentWeatherData(cityName));
    }, []);

    useEffect(() => {
        if (fiveDaysWeather && fiveDaysWeather.length > 0) {
            const filteredTodaysWeather = fiveDaysWeather.filter((weather: FiveDaysWeather) => weather.date === fiveDaysWeather[0].date);
            setWeatherDetails([
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
            ]);
            setTodaysWeather(filteredTodaysWeather);
        }
    }, [fiveDaysWeather]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsDropDownOpen(false);
        dispatch(fetchFiveDaysWeatherData(cityName));
        dispatch(fetchCurrentWeatherData(cityName));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCityName(e.target.value);
        setIsDropDownOpen(true);
    };

    const citiesDropDown = () => {
        const searchTerm = cityName.toLowerCase();
        let cityNameAfterFilter = '';

        const filteredCities = cities.filter((city: any) => {
            const name = city.name.toLowerCase();

            if (searchTerm && name.includes(searchTerm)) {
                cityNameAfterFilter = city.name.toLowerCase();
                return true;
            }

            return false;
        });

        if (filteredCities.length <= 1 && cityNameAfterFilter === searchTerm) {
            setIsDropDownOpen(false);
            return <span></span>;
        }

        if (filteredCities.length <= 1 && !cityNameAfterFilter.includes(searchTerm)) {
            return <p>No cities found</p>;
        }

        return filteredCities
            .slice(0, 10)
            .map((city: any) => <span onClick={() => handleCitySuggestionClick(city.name)} key={city.id}>{city.name}</span>);
    };

    const handleCitySuggestionClick = (city: string) => {
        setCityName(city);
        setIsDropDownOpen(false);
    };

    return (
        <aside className={styles["aside"]}>
            <form action="" onSubmit={handleSubmit}>
                <input className={styles["aside__input"]} placeholder='Location' type="text" value={cityName} onChange={handleChange} />
                {isDropDownOpen ?
                    <div className={styles["aside__dropdown"]} >
                        {citiesDropDown()}
                    </div>
                    :
                    null}
                <button className={styles["aside__search-button"]}><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
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