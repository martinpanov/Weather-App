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
            const timeComponents = currentWeather.time.split(' ');
            const time = timeComponents[0];
            const ampm = timeComponents[1];

            let [hours, minutes] = time.split(':').map(Number);

            if (ampm === "PM" && hours !== 12) {
                hours += 12;
            }

            const timeAsNumber = (hours * 100) + minutes;

            switch (currentWeather.weather) {
                case 'Clear':
                    if (timeAsNumber > 1800 || timeAsNumber < 500) {
                        setBackGroundImage('./clear-night.webp');
                    } else {
                        setBackGroundImage('./clear.webp');
                    }
                    break;
                case 'Clouds':
                    if (timeAsNumber > 1800 || timeAsNumber < 500) {
                        setBackGroundImage('./night-cloudy.webp');
                    } else {
                        setBackGroundImage('./day-cloudy.webp');
                    }
                    break;
                case 'Snow':
                    setBackGroundImage('./snow.webp');
                    break;
                case 'Rain':
                    if (timeAsNumber > 1800 || timeAsNumber < 500) {
                        setBackGroundImage('./rain-night.webp');
                    } else {
                        setBackGroundImage('./rain-day.webp');
                    }
                    break;
                case 'Drizzle':
                    setBackGroundImage('./drizzle.webp');
                    break;
                case 'Mist':
                    setBackGroundImage('./mist.webp');
                    break;
                case 'Fog':
                    setBackGroundImage('./mist.webp');
                    break;
                case 'Haze':
                    setBackGroundImage('./mist.webp');
                    break;
                case 'Thunderstorm':
                    setBackGroundImage('./thunderstorm.webp');
                    break;
                default:
                    setBackGroundImage('./day-cloudy.webp');
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
