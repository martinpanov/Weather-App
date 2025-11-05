import { useEffect, useState } from 'react';

import styles from './Form.module.css';
import { City } from './types';
import citiesData from '../../../../city.list.json';
import useClickOutside from '../hooks/useClickOutside';

type CitiesDropdownProps = {
  cityName: string;
  handleSuggestionClick: (city: string) => void;
};

export const CitiesDropdown = ({
  cityName,
  handleSuggestionClick,
}: CitiesDropdownProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(true);
  const dropDownMenuRef = useClickOutside(() => setIsDropDownOpen(false));

  useEffect(() => {
    if (cityName) {
      setIsDropDownOpen(true);
    }
  }, [cityName]);

  const handleClick = (city: string) => {
    handleSuggestionClick(city);
    setIsDropDownOpen(false);
  };

  if (!isDropDownOpen || !cityName) {
    return null;
  }

  const citiesList = citiesData as City[];
  const filteredCities = citiesList.filter(
    (cityFromList: City) =>
      cityName && cityFromList.name.toLowerCase().includes(cityName)
  );

  if (filteredCities.length === 0) {
    return <p>No cities found</p>;
  }

  const finalCities = filteredCities.slice(0, 10).map((city: City) => (
    <span onClick={() => handleClick(city.name)} key={city.id}>
      {city.name}
    </span>
  ));

  return (
    <div className={styles['aside__dropdown']} ref={dropDownMenuRef}>
      {finalCities}
    </div>
  );
};
