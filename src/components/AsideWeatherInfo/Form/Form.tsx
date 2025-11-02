import { connect } from "react-redux";
import { FC, useState } from "react";
import styles from './Form.module.css';
import { mapDispatchToProps } from "../actions";
import { CitiesDropdown } from "./CitiesDropdown";
import citiesData from "../../../../city.list.json";
import { City } from "./types";

type Props = {
    fetchAllData: (cityName: string) => void;
};

const Form: FC<Props> = ({ fetchAllData }) => {
    const [cityName, setCityName] = useState('');

    const citiesList = citiesData as City[];
    const filteredCities = citiesList.filter((cityFromList: City) => cityName && cityFromList.name.toLowerCase().includes(cityName));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchAllData(cityName);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="location" className={styles["aside__input"]} placeholder='Location' type="text" value={cityName} onChange={(e) => setCityName(e.target.value.toLowerCase())} />
            <CitiesDropdown
                cityName={cityName}
                filteredCities={filteredCities}
                handleSuggestionClick={(city: string) => setCityName(city)}
            />
            <button className={styles["aside__search-button"]}><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
    );
};

export default connect(null, mapDispatchToProps)(Form);