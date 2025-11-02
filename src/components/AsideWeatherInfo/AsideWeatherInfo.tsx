import { connect, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import styles from './AsideWeatherInfo.module.css';
import Form from './Form/Form';
import toast from 'react-hot-toast';
import { mapDispatchToProps } from './actions';
import { DailyForecast, FiveDaysWeather } from '../../types';
import getDailyForecast from '../../utils/getDailyForecast';
import { Forecast } from './Forecast/Forecast';
import { RenderIf } from '../RenderIf/RenderIf';
import { LoadingSkeleton } from '../LoadingSkeleton/LoadingSkeleton';

type WeatherDetails = {
    name: string;
    value: number;
    unit: string;
};

type Props = {
    fetchAllData: (cityName: string) => void;
};

function WeatherInfo({ fetchAllData }: Props) {
    const [weatherDetails, setWeatherDetails] = useState<WeatherDetails[]>([]);
    const [todaysWeather, setTodaysWeather] = useState<FiveDaysWeather[]>([]);

    const { fiveDaysWeather, loading, error: fiveDaysError } = useSelector((state: RootState) => state.fiveDaysWeather);
    const { currentWeather, error: currentWeatherError } = useSelector((state: RootState) => state.currentWeather);

    const dailyForecast: DailyForecast[] = getDailyForecast(fiveDaysWeather);

    useEffect(() => {
        fetchAllData('Plovdiv');
    }, []);

    useEffect(() => {
        if (!fiveDaysError.message && !currentWeatherError.message) {
            return;
        }

        if (fiveDaysError.message === currentWeatherError.message) {
            toast.error(fiveDaysError.message);
            return;
        }

        if (fiveDaysError.message) {
            toast.error(fiveDaysError.message);
        }
        if (currentWeatherError.message) {
            toast.error(currentWeatherError.message);
        }
    }, [fiveDaysError, currentWeatherError]);

    useEffect(() => {
        if (fiveDaysWeather.length === 0 || !currentWeather.humidity || !currentWeather.wind) {
            return;
        }

        const todaysDate = fiveDaysWeather[0].date;
        const filteredTodaysWeather = fiveDaysWeather.filter(weather => weather.date === todaysDate);
        const degrees = filteredTodaysWeather.map(weather => weather.degrees);

        setWeatherDetails([
            { name: 'High', value: Math.max(...degrees), unit: '°' },
            { name: 'Low', value: Math.min(...degrees), unit: '°' },
            { name: 'Humidity', value: currentWeather.humidity, unit: '%' },
            { name: 'Wind', value: currentWeather.wind, unit: 'm/s' },
            { name: 'Precipitation', value: filteredTodaysWeather[0].precipitation, unit: '%' }
        ]);
        setTodaysWeather(filteredTodaysWeather);
    }, [fiveDaysWeather, currentWeather]);


    return (
        <aside className={styles["aside"]}>
            <Form />
            <div className={styles["aside__weather-details"]}>
                <h2 className={styles["aside__weather-info-title"]}>Weather Details</h2>
                <ul className={styles["aside__weather-info-list"]} role='list'>
                    {weatherDetails.map((detail) => (
                        <li className={styles["aside__weather-info-list-item"]} key={detail.name}>
                            <RenderIf condition={loading}>
                                <LoadingSkeleton width="100%" height="30px" />
                            </RenderIf>
                            <RenderIf condition={!loading}>
                                <span className={styles["aside__weather-info-type"]}>{detail.name}</span>
                                <span className={styles["aside__weather-info-value"]}>{detail.value}{detail.unit}</span>
                            </RenderIf>
                        </li>
                    ))}
                </ul>
            </div>
            <Forecast title="Today's Forecast" forecast={todaysWeather} loading={loading} />
            <Forecast title="Daily Forecast" forecast={dailyForecast} loading={loading} />
        </aside>
    );
}

export default connect(null, mapDispatchToProps)(WeatherInfo);