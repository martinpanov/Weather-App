import './App.css';
import MainWeatherInfo from './components/MainWeatherInfo/MainWeatherInfo';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';

function App() {

  return (
    <>
      <img className="main__background-image" src="./day-cloudy.jpg" alt="day-cloudy" />
      <WeatherInfo />
      <MainWeatherInfo />
    </>
  );
}

export default App;
