import { FC } from "react";
import styles from "./Forecast.module.css";
import { DailyForecast, FiveDaysWeather } from "../../../types";
import { LoadingSkeleton } from "../../LoadingSkeleton/LoadingSkeleton";
import { RenderIf } from "../../RenderIf/RenderIf";

type Props = {
  title: string;
  forecast: FiveDaysWeather[] | DailyForecast[];
  loading: boolean;
};

export const Forecast: FC<Props> = ({ title, forecast, loading }) => {
  return (
    <div className={styles["aside__weather-details"]}>
      <h2 className={styles["aside__weather-info-title"]}>{title}</h2>
      <RenderIf condition={loading}>
        <LoadingSkeleton width="100%" height="160px" />
      </RenderIf>
      <RenderIf condition={!loading}>
        <ul className={styles["aside__weather-time-list"]} role='list'>
          {forecast.map((weather, index) => (
            <li className={styles["aside__weather-time-list-item"]} key={index}>
              <span className={styles["aside__weather-time"]}>{(weather as FiveDaysWeather).time || weather.date}</span>
              <img src={weather.icon} alt="weather" />
              <span className={styles["aside__weather-degrees"]}>{weather.degrees}&deg;</span>
            </li>
          ))}
        </ul>
      </RenderIf>
    </div>
  );
};