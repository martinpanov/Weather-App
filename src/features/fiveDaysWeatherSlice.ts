import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import formatTime from '../utils/formatDate';

interface FiveDaysWeather {
    degrees: number;
    time: string;
    date: string;
    precipitation: number;
    weather: string;
    icon: string;
}

interface FiveDaysWeatherState {
    fiveDaysWeather: FiveDaysWeather[];
    loading: boolean;
    error: string;
}

const initialFiveDaysWeatherState: FiveDaysWeatherState = {
    fiveDaysWeather: [],
    loading: true,
    error: ''
};

export const fetchFiveDaysWeatherData = createAsyncThunk('fiveDaysWeather/fetchData', async (cityName: string) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`);

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const fiveDaysWeatherData = await response.json();

        const formattedData = fiveDaysWeatherData.list.map((day: any) => {
            return {
                degrees: Number(day.main.temp.toFixed(0)),
                time: formatTime(fiveDaysWeatherData.city.timezone, day.dt * 1000),
                date: new Date(day.dt * 1000).toLocaleDateString('en-GB'),
                precipitation: day.pop,
                weather: day.weather[0].main,
                icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
            };
        });

        return formattedData;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

const fiveDaysWeatherSlice = createSlice({
    name: 'fiveDaysWeather',
    initialState: initialFiveDaysWeatherState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFiveDaysWeatherData.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchFiveDaysWeatherData.fulfilled, (state, action) => {
                state.loading = false;
                state.fiveDaysWeather = action.payload;
            })
            .addCase(fetchFiveDaysWeatherData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occured';
            });
    }
});


export default fiveDaysWeatherSlice.reducer;