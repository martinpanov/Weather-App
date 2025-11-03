import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store';

export const useErrors = () => {
  const { error: fiveDaysError } = useSelector((state: RootState) => state.fiveDaysWeather);
  const { error: currentWeatherError } = useSelector((state: RootState) => state.currentWeather);

  useEffect(() => {
    if (!fiveDaysError.message && !currentWeatherError.message) {
      return;
    }

    if (fiveDaysError.message === currentWeatherError.message) {
      toast.error(fiveDaysError.message);
      return;
    }

    toast.error(fiveDaysError.message ? fiveDaysError.message : currentWeatherError.message);
  }, [fiveDaysError, currentWeatherError]);
};
