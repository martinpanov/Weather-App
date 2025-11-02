import styles from './Form.module.css';
import useClickOutside from '../../../hooks/useClickOutside';
import { useState, useEffect } from 'react';
import { City } from './types';

type CitiesDropdownProps = {
  cityName: string;
  filteredCities: City[];
  handleSuggestionClick: (city: string) => void;
};

export const CitiesDropdown = ({ cityName, filteredCities, handleSuggestionClick }: CitiesDropdownProps) => {
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

  if (filteredCities.length === 0) {
    return <p>No cities found</p>;
  }

  const finalCities = filteredCities
    .slice(0, 10)
    .map((city: City) => <span onClick={() => handleClick(city.name)} key={city.id}>{city.name}</span>);

  return (
    <div className={styles["aside__dropdown"]} ref={dropDownMenuRef} >
      {finalCities}
    </div>
  );
};