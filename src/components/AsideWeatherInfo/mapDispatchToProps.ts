import { fetchCurrentWeatherData } from '../../slices/currentWeatherSlice';
import { fetchFiveDaysWeatherData } from '../../slices/fiveDaysWeatherSlice';
import { AppDispatch } from '../../store';

const allActions = [fetchFiveDaysWeatherData, fetchCurrentWeatherData];

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchAllData: (cityName: string) =>
    allActions.map((action) => dispatch(action(cityName))),
});
