import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getCurrentWeather, getFiveDaysWeather, getFiveDaysWeatherLoading } from '../../selectors';
import { RootState } from '../../store';
import { CurrentWeather, DailyForecast, FiveDaysWeather } from '../../types';
import getDailyForecast from '../../utils/getDailyForecast';
import { LoadingSkeleton } from '../LoadingSkeleton/LoadingSkeleton';
import { RenderIf } from '../RenderIf/RenderIf';
import styles from './AsideWeatherInfo.module.css';
import { Forecast } from './Forecast/Forecast';
import Form from './Form/Form';
import { useErrors } from './hooks/useErrors';
import { mapDispatchToProps } from './mapDispatchToProps';

type WeatherDetails = {
  name: string;
  value: number;
  unit: string;
};

type StateProps = {
  fiveDaysWeather: FiveDaysWeather[];
  currentWeather: CurrentWeather;
  loading: boolean;
};

type DispatchProps = {
  fetchAllData: (cityName: string) => void;
};

type Props = StateProps & DispatchProps;

const WeatherInfo = ({ fetchAllData, fiveDaysWeather, currentWeather, loading }: Props) => {
  const [weatherDetails, setWeatherDetails] = useState<WeatherDetails[]>([]);
  const [todaysWeather, setTodaysWeather] = useState<FiveDaysWeather[]>([]);

  const dailyForecast: DailyForecast[] = getDailyForecast(fiveDaysWeather);

  useEffect(() => {
    fetchAllData('Plovdiv');
  }, [fetchAllData]);

  useErrors();

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
    <aside className={styles['aside']}>
      <Form />
      <div className={styles['aside__weather-details']}>
        <h2 className={styles['aside__weather-info-title']}>Weather Details</h2>
        <ul className={styles['aside__weather-info-list']} role="list">
          {weatherDetails.map(detail => (
            <li className={styles['aside__weather-info-list-item']} key={detail.name}>
              <RenderIf condition={loading}>
                <LoadingSkeleton width="100%" height="30px" />
              </RenderIf>
              <RenderIf condition={!loading}>
                <span className={styles['aside__weather-info-type']}>{detail.name}</span>
                <span className={styles['aside__weather-info-value']}>
                  {detail.value}
                  {detail.unit}
                </span>
              </RenderIf>
            </li>
          ))}
        </ul>
      </div>
      <Forecast title="Today's Forecast" forecast={todaysWeather} loading={loading} />
      <Forecast title="Daily Forecast" forecast={dailyForecast} loading={loading} />
    </aside>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  fiveDaysWeather: getFiveDaysWeather(state),
  currentWeather: getCurrentWeather(state),
  loading: getFiveDaysWeatherLoading(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherInfo);
