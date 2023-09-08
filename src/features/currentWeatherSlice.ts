import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import formatTime from '../utils/formatDate';

interface CurrentWeather {
    cityName: string;
    degrees: number;
    humidity: number;
    wind: number;
    time: string;
    date: string;
    weather: string;
    icon: string;
}

interface ErrorType {
    message: string;
    sliceName: string;
}

interface CurrentWeatherState {
    currentWeather: CurrentWeather;
    loading: boolean;
    error: ErrorType;
}

const initialCurrentWeatherState: CurrentWeatherState = {
    currentWeather: {
        cityName: '',
        degrees: 0,
        humidity: 0,
        wind: 0,
        weather: '',
        time: '',
        date: '',
        icon: ''
    },
    loading: true,
    error: {
        message: '',
        sliceName: ''
    }
};


export const fetchCurrentWeatherData = createAsyncThunk('currentWeather/fetchData', async (cityName: string, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`);

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const currentWeatherData = await response.json();

        const formattedData = {
            cityName: currentWeatherData.name,
            degrees: Number(currentWeatherData.main.temp.toFixed(0)),
            time: formatTime(currentWeatherData.timezone, 0, 'time'),
            date: new Date(currentWeatherData.dt * 1000).toLocaleDateString('en-GB'),
            humidity: currentWeatherData.main.humidity,
            wind: currentWeatherData.wind.speed,
            weather: currentWeatherData.weather[0].main,
            icon: `https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`,
        };

        return formattedData;
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue({ message: error.message, sliceName: 'currentWeather' });
        } else {
            return rejectWithValue('An unknown error occurred');
        }
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
                state.error = {
                    message: '',
                    sliceName: ''
                };
            })
            .addCase(fetchCurrentWeatherData.fulfilled, (state, action) => {
                state.loading = false;
                state.currentWeather = action.payload;
            })
            .addCase(fetchCurrentWeatherData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as ErrorType;
            });
    }
});


export default currentWeatherSlice.reducer;