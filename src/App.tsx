import './App.css';
import MainWeatherInfo from './components/MainWeatherInfo/MainWeatherInfo';
import WeatherInfo from './components/AsideWeatherInfo/AsideWeatherInfo';
import { Toaster } from 'react-hot-toast';
import { Background } from './components/Background/Background';
import React from 'react';

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
