import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

interface currentWeather {
    degrees: string,
    time: string,
    weather: string,
    icon: string,
    lon: string,
    lat: string;
    loading: boolean,
    error: string;
}

const initialCurrentWeatherState: currentWeather = {
    degrees: '',
    time: '',
    weather: '',
    icon: '',
    lon: '',
    lat: '',
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
            time: `${new Date(currentWeatherData.dt * 1000).toLocaleTimeString('en-GB')} ${new Date(currentWeatherData.dt * 1000).toLocaleDateString('en-GB')}`,
            weather: currentWeatherData.weather[0].main,
            icon: `https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`,
            lon: currentWeatherData.coord.lon,
            lat: currentWeatherData.coord.lat,
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
                state.weather = action.payload.weather;
                state.icon = action.payload.icon;
                state.lon = action.payload.lon;
                state.lat = action.payload.lat;
            })
            .addCase(fetchCurrentWeatherData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occured';
            });
    }
});


export const selectCurrentWeatherDetails = (state: RootState) => state.currentWeather;
export default currentWeatherSlice.reducer;