# Project Documentation: Cars

## Overview

This App is a single-page application built with React that allows users to check the weather in different cities.

### The link to the website is https://donttouchmydomain.com

![Cars](https://user-images.githubusercontent.com/106311309/230741582-e7f9954e-e37f-45d2-adcf-debcf9d6e8a4.jpg)

## Technology Stack

 * React
 * OpenWeather API
 * TypeScript
 * Redux

## Project Architecture

The app consists of several main components:

 * MainWeatherInfo: This component shows the current weather, time and an icon that matches the current weather conditions
 * AsideWeatherInfo: This component displays the today's weather details, today's forecast and a 5-day forecast

## Project Setup

To set up the project locally, follow these steps:

1. Clone the project repository from GitHub.
2. Install the dependencies using `npm install`.
3. Create a `.env` file and add your OpenWeather API key, the key should be named VITE_OPEN_WEATHER_API_KEY and next to it, you should add the value.
4. Run the dev server using `npm run dev`.

## Project Features

 * City suggestions are being provided whenever you type in the search input box.
 * Current weather conditions and the background image as well as the image above the degrees changes according to the weather conditions.
 * Today's forecast.
 * 5-day forecast.
