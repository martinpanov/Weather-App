import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import formatTime from '../utils/formatDate';

type CurrentWeatherState = {
  currentWeather: {
    cityName: string;
    degrees: number;
    humidity: number;
    wind: number;
    time: string;
    date: string;
    weather: string;
    icon: string;
  };
  loading: boolean;
  error: {
    message: string;
    sliceName: string;
  };
};

const initialCurrentWeatherState: CurrentWeatherState = {
  currentWeather: {
    cityName: '',
    degrees: 0,
    humidity: 0,
    wind: 0,
    weather: '',
    time: '',
    date: '',
    icon: '',
  },
  loading: true,
  error: {
    message: '',
    sliceName: '',
  },
};

export const fetchCurrentWeatherData = createAsyncThunk(
  'currentWeather/fetchData',
  async (cityName: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`
      );

      const currentWeatherData = await response.json();

      if (!response.ok) {
        throw new Error(currentWeatherData.message);
      }

      const formattedData = {
        cityName: currentWeatherData.name,
        degrees: Number(currentWeatherData.main.temp.toFixed(0)),
        time: formatTime(currentWeatherData.timezone, 0, 'time'),
        date: new Date(currentWeatherData.dt * 1000).toLocaleDateString(
          'en-GB'
        ),
        humidity: currentWeatherData.main.humidity,
        wind: currentWeatherData.wind.speed,
        weather: currentWeatherData.weather[0].main,
        icon: `https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`,
      };

      return formattedData;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({
          message: error.message,
          sliceName: 'currentWeather',
        });
      }

      return rejectWithValue('An unknown error occurred');
    }
  }
);

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
          sliceName: '',
        };
      })
      .addCase(fetchCurrentWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload;
      })
      .addCase(fetchCurrentWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as CurrentWeatherState['error'];
      });
  },
});

export default currentWeatherSlice.reducer;
