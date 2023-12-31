import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { useState, useEffect } from "react";
import { fetchFiveDaysWeatherData } from "../../../features/fiveDaysWeatherSlice";
import { fetchCurrentWeatherData } from "../../../features/currentWeatherSlice";
import citiesData from "../../../../city.list.json";
import styles from './Form.module.css';
import useClickOutside from "../../../hooks/useClickOutside";

interface Cities {
    id: number;
    name: string;
    state: string;
    country: string;
    coord: {
        lon: number;
        lat: number;
    };
}

export default function Form() {
    const cities = citiesData as Cities[];

    const dropDownMenuRef = useClickOutside(() => {
        setIsDropDownOpen(false);
    });

    const [cityName, setCityName] = useState('Plovdiv');
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFiveDaysWeatherData(cityName));
        dispatch(fetchCurrentWeatherData(cityName));
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsDropDownOpen(false);
        dispatch(fetchFiveDaysWeatherData(cityName));
        dispatch(fetchCurrentWeatherData(cityName));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCityName(e.target.value);
        setIsDropDownOpen(true);
    };

    const citiesDropDown = () => {
        const searchTerm = cityName.toLowerCase();
        let cityNameAfterFilter = '';

        const filteredCities = cities.filter((city: Cities) => {
            const name = city.name.toLowerCase();

            if (searchTerm && name.includes(searchTerm)) {
                cityNameAfterFilter = city.name.toLowerCase();
                return true;
            }

            return false;
        });

        if (filteredCities.length <= 1 && cityNameAfterFilter === searchTerm) {
            setIsDropDownOpen(false);
            return <span></span>;
        }

        if (filteredCities.length <= 1 && !cityNameAfterFilter.includes(searchTerm)) {
            return <p>No cities found</p>;
        }

        return filteredCities
            .slice(0, 10)
            .map((city: Cities) => <span onClick={() => handleCitySuggestionClick(city.name)} key={city.id}>{city.name}</span>);
    };

    const handleCitySuggestionClick = (city: string) => {
        setCityName(city);
        setIsDropDownOpen(false);
    };

    return (
        <form action="" onSubmit={handleSubmit}>
            <input className={styles["aside__input"]} placeholder='Location' type="text" value={cityName} onChange={handleChange} />
            {isDropDownOpen ?
                <div className={styles["aside__dropdown"]} ref={dropDownMenuRef} >
                    {citiesDropDown()}
                </div>
                :
                null}
            <button className={styles["aside__search-button"]}><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
    );
}