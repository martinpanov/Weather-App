import styles from './Form.module.css';
import { City } from './types';
import citiesData from '../../../../city.list.json';
import useClickOutside from '../hooks/useClickOutside';
import { RenderIf } from '../../RenderIf/RenderIf';

type CitiesDropdownProps = {
  cityName: string;
  isOpen: boolean;
  onClose: () => void;
  handleSuggestionClick: (city: string) => void;
};

export const CitiesDropdown = ({
  cityName,
  isOpen,
  onClose,
  handleSuggestionClick,
}: CitiesDropdownProps) => {
  const dropDownMenuRef = useClickOutside(onClose);

  const handleClick = (city: string) => {
    handleSuggestionClick(city);
    onClose();
  };

  if (!isOpen || !cityName) {
    return null;
  }

  const citiesList = citiesData as City[];
  const filteredCities = citiesList.filter(
    (cityFromList: City) =>
      cityName && cityFromList.name.toLowerCase().includes(cityName.toLowerCase())
  );

  const finalCities = filteredCities.slice(0, 10).map((city: City) => (
    <span className={styles['aside__city-name']} onClick={() => handleClick(city.name)} key={city.id}>
      {city.name}
    </span>
  ));

  return (
    <div className={styles['aside__dropdown']} ref={dropDownMenuRef}>
      <RenderIf condition={filteredCities.length === 0}>
        <p>No cities found</p>
      </RenderIf>
      <RenderIf condition={filteredCities.length !== 0}>
        {finalCities}
      </RenderIf>
    </div>
  );
};
