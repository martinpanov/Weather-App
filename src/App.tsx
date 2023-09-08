import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import MainWeatherInfo from './components/MainWeatherInfo/MainWeatherInfo';
import WeatherInfo from './components/AsideWeatherInfo/AsideWeatherInfo';
import { RootState } from './store';
import { Toaster } from 'react-hot-toast';


function App() {
    const { currentWeather } = useSelector((state: RootState) => state.currentWeather);
    const [backgroundImage, setBackGroundImage] = useState('');

    useEffect(() => {
        if (currentWeather.weather && currentWeather.time) {
            const timeInGBFormat = new Date(`${currentWeather.date} ${currentWeather.time}`);
            const hours = timeInGBFormat.getHours();
            const minutes = timeInGBFormat.getMinutes();

            const timeAsNumber = hours * 100 + minutes;

            switch (currentWeather.weather) {
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
    }, [currentWeather]);

    return (
        <>
            <Toaster
                reverseOrder={true}
            />
            <img className="main__background-image" src={backgroundImage} alt="day-cloudy" />
            <MainWeatherInfo />
            <WeatherInfo />
        </>
    );
}

export default App;
