import { FormEvent, useState } from 'react';
import { connect } from 'react-redux';

import { mapDispatchToProps } from '../mapDispatchToProps';
import { CitiesDropdown } from './CitiesDropdown';
import styles from './Form.module.css';

type Props = {
  fetchAllData: (cityName: string) => void;
};

const Form = ({ fetchAllData }: Props) => {
  const [cityName, setCityName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchAllData(cityName);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
    setIsDropdownOpen(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="location"
        className={styles['aside__input']}
        placeholder="Location"
        type="text"
        value={cityName}
        onChange={handleInputChange}
      />
      <CitiesDropdown
        cityName={cityName}
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        handleSuggestionClick={(city: string) => setCityName(city)}
      />
      <button className={styles['aside__search-button']}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};

export default connect(null, mapDispatchToProps)(Form);
