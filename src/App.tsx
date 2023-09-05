import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import MainWeatherInfo from './components/MainWeatherInfo/MainWeatherInfo';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import { AppDispatch, RootState } from './store';
import { fetchCurrentWeatherData } from './features/currentWeatherSlice';

function App() {
    const cityName = 'Plovdiv';

    const dispatch: AppDispatch = useDispatch();
    const currentWeatherDetails = useSelector((state: RootState) => state.currentWeather);
    const [backgroundImage, setBackGroundImage] = useState('');

    // useEffect(() => {
    //     dispatch(fetchCurrentWeatherData(cityName));
    // }, [dispatch, cityName]);

    useEffect(() => {
        if (currentWeatherDetails.weather && currentWeatherDetails.time) {
            const timeInGBFormat = new Date(`${currentWeatherDetails.date} ${currentWeatherDetails.time}`);
            const hours = timeInGBFormat.getHours();
            const minutes = timeInGBFormat.getMinutes();

            const timeAsNumber = hours * 100 + minutes;

            switch (currentWeatherDetails.weather) {
                case 'Clear':
                    if (timeAsNumber > 1800 || timeAsNumber < 500) {
                        setBackGroundImage('./clear-night.jpg');
                    } else {
                        setBackGroundImage('./clear.jpg');
                    }
                    break;
                case 'Clouds':
                    if (timeAsNumber > 1800 || timeAsNumber < 500) {
                        setBackGroundImage('./night-cloudy.jpg');
                    } else {
                        setBackGroundImage('./day-cloudy.jpg');
                    }
                    break;
                case 'Snow':
                    setBackGroundImage('./snow.jpg');
                    break;
                case 'Rain':
                    if (timeAsNumber > 1800 || timeAsNumber < 500) {
                        setBackGroundImage('./rain-night.jpg');
                    } else {
                        setBackGroundImage('./rain-day.jpg');
                    }
                    break;
                case 'Drizzle':
                    setBackGroundImage('./drizzle.jpg');
                    break;
                case 'Mist':
                    setBackGroundImage('./mist.jpg');
                    break;
                case 'Fog':
                    setBackGroundImage('./mist.jpg');
                    break;
                case 'Haze':
                    setBackGroundImage('./mist.jpg');
                    break;
                case 'Thunderstorm':
                    setBackGroundImage('./thunderstorm.jpg');
                    break;
                default:
                    setBackGroundImage('./day-cloudy.jpg');
                    break;
            }
        }
    }, [currentWeatherDetails]);

    return (
        <>
            <img className="main__background-image" src={backgroundImage} alt="day-cloudy" />
            <WeatherInfo />
            <MainWeatherInfo />
        </>
    );
}

export default App;
