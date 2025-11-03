import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getCurrentWeather } from '../../selectors';
import { RootState } from '../../store';
import { CurrentWeather } from '../../types';
import styles from './Background.module.css';

const isNightTime = (timeAsNumber: number) => timeAsNumber > 1800 || timeAsNumber < 500;

const WEATHER_CONDITION_BASED_IMAGE: Record<string, string | ((timeAsNumber: number) => string)> = {
  Clear: (timeAsNumber: number) =>
    isNightTime(timeAsNumber) ? './clear-night.webp' : './clear.webp',
  Clouds: (timeAsNumber: number) =>
    isNightTime(timeAsNumber) ? './night-cloudy.webp' : './day-cloudy.webp',
  Rain: (timeAsNumber: number) =>
    isNightTime(timeAsNumber) ? './rain-day.webp' : './rain-night.webp',
  Snow: './snow.webp',
  Drizzle: './drizzle.webp',
  Mist: './mist.webp',
  Fog: './mist.webp',
  Haze: './mist.webp',
  Thunderstorm: './thunderstorm.webp'
};

type StateProps = {
  currentWeather: CurrentWeather;
};

const Background = ({ currentWeather }: StateProps) => {
  const [backgroundImage, setBackGroundImage] = useState('');

  useEffect(() => {
    if (!currentWeather.weather || !currentWeather.time) {
      return;
    }

    const timeComponents = currentWeather.time.split(' ');
    const time = timeComponents[0];
    const ampm = timeComponents[1];

    let [hours, minutes] = time.split(':').map(Number);

    if (ampm === 'PM' && hours !== 12) {
      hours += 12;
    }

    const timeAsNumber = hours * 100 + minutes;
    const weatherImage =
      WEATHER_CONDITION_BASED_IMAGE[currentWeather.weather] || './day-cloudy.webp';
    setBackGroundImage(
      typeof weatherImage === 'function' ? weatherImage(timeAsNumber) : weatherImage
    );
  }, [currentWeather]);

  return (
    <img className={styles['main__background-image']} src={backgroundImage} alt="day-cloudy" />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  currentWeather: getCurrentWeather(state)
});

export default connect(mapStateToProps)(Background);
