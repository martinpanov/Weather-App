import { Provider } from 'react-redux';
import './App.css';
import MainWeatherInfo from './components/MainWeatherInfo/MainWeatherInfo';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import store from './store';

function App() {

  return (
    <Provider store={store}>
      <img className="main__background-image" src="./day-cloudy.jpg" alt="day-cloudy" />
      <WeatherInfo />
      <MainWeatherInfo />
    </Provider>
  );
}

export default App;
