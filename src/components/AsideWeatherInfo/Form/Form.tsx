import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { useState, useRef, useEffect } from "react";
import { fetchFiveDaysWeatherData } from "../../../features/fiveDaysWeatherSlice";
import { fetchCurrentWeatherData } from "../../../features/currentWeatherSlice";
import citiesData from "../../../../city.list.json";
import styles from './Form.module.css';

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
    const cities: Cities[] = citiesData as Cities[];

    const dropDownMenuRef = useRef<HTMLDivElement | null>(null);

    const [cityName, setCityName] = useState('Plovdiv');
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFiveDaysWeatherData(cityName));
        dispatch(fetchCurrentWeatherData(cityName));
    }, []);

    useEffect(() => {
        const handleOutsideClick = (e: any) => {
            if (dropDownMenuRef.current && !dropDownMenuRef.current.contains(e.target)) {
                setIsDropDownOpen(false);
            }
        };

        if (isDropDownOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };

    }, [isDropDownOpen, dropDownMenuRef]);


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

        const filteredCities = cities.filter((city: any) => {
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
            .map((city: any) => <span onClick={() => handleCitySuggestionClick(city.name)} key={city.id}>{city.name}</span>);
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