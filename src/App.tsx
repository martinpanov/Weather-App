import React from 'react';
import { Toaster } from 'react-hot-toast';

import './App.css';
import WeatherInfo from './components/AsideWeatherInfo/AsideWeatherInfo';
import Background from './components/Background/Background';
import MainWeatherInfo from './components/MainWeatherInfo/MainWeatherInfo';

function App() {
  return (
    <React.Fragment>
      <Toaster reverseOrder={true} />
      <Background />
      <MainWeatherInfo />
      <WeatherInfo />
    </React.Fragment>
  );
}

export default App;
