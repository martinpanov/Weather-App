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

interface ErrorType {
    message: string;
    sliceName: string;
}

interface FiveDaysWeatherState {
    fiveDaysWeather: FiveDaysWeather[];
    loading: boolean;
    error: ErrorType;
}


const initialFiveDaysWeatherState: FiveDaysWeatherState = {
    fiveDaysWeather: [],
    loading: true,
    error: {
        message: '',
        sliceName: ''
    }
};

export const fetchFiveDaysWeatherData = createAsyncThunk('fiveDaysWeather/fetchData', async (cityName: string, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`);

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const fiveDaysWeatherData = await response.json();

        const formattedData = fiveDaysWeatherData.list.map((day: any) => {
            return {
                degrees: Number(day.main.temp.toFixed(0)),
                time: formatTime(fiveDaysWeatherData.city.timezone, day.dt * 1000, 'time'),
                date: formatTime(fiveDaysWeatherData.city.timezone, day.dt * 1000, 'date'),
                precipitation: day.pop,
                weather: day.weather[0].main,
                icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
            };
        });

        return formattedData;
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue({ message: error.message, sliceName: 'fiveDaysWeather' });
        } else {
            return rejectWithValue('An unknown error occurred');
        }
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
                state.error = {
                    message: '',
                    sliceName: ''
                };
            })
            .addCase(fetchFiveDaysWeatherData.fulfilled, (state, action) => {
                state.loading = false;
                state.fiveDaysWeather = action.payload;
            })
            .addCase(fetchFiveDaysWeatherData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as ErrorType;
            });
    }
});


export default fiveDaysWeatherSlice.reducer;