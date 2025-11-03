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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchAllData(cityName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="location"
        className={styles['aside__input']}
        placeholder="Location"
        type="text"
        value={cityName}
        onChange={e => setCityName(e.target.value.toLowerCase())}
      />
      <CitiesDropdown
        cityName={cityName}
        handleSuggestionClick={(city: string) => setCityName(city)}
      />
      <button className={styles['aside__search-button']}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};

export default connect(null, mapDispatchToProps)(Form);
