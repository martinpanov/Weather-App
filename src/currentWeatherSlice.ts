import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface CurrentWeather {
    degrees: string;
    temp_max: string;
    temp_low: string;
    humidity: string;
    wind: string;
    time: string;
    date: string;
    weather: string;
    icon: string;
    loading: boolean;
    error: string;
}

const initialCurrentWeatherState: CurrentWeather = {
    degrees: '',
    temp_max: '',
    temp_low: '',
    humidity: '',
    wind: '',
    weather: '',
    time: '',
    date: '',
    icon: '',
    loading: true,
    error: ''
};

export const fetchCurrentWeatherData = createAsyncThunk('currentWeather/fetchData', async (cityName: string) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`);

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const currentWeatherData = await response.json();

        const formattedData = {
            degrees: currentWeatherData.main.temp.toFixed(0),
            time: new Date(currentWeatherData.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            date: new Date(currentWeatherData.dt * 1000).toLocaleDateString('en-GB'),
            humidity: currentWeatherData.main.humidity,
            wind: currentWeatherData.wind.speed,
            weather: currentWeatherData.weather[0].main,
            icon: `https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`,
        };

        return formattedData;
    } catch (error) {
        throw error;
    }
});

const currentWeatherSlice = createSlice({
    name: 'currentWeather',
    initialState: initialCurrentWeatherState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentWeatherData.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchCurrentWeatherData.fulfilled, (state, action) => {
                state.loading = false;
                state.degrees = action.payload.degrees;
                state.time = action.payload.time;
                state.date = action.payload.date;
                state.humidity = action.payload.humidity;
                state.wind = action.payload.wind;
                state.weather = action.payload.weather;
                state.icon = action.payload.icon;
            })
            .addCase(fetchCurrentWeatherData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occured';
            });
    }
});


export default currentWeatherSlice.reducer;