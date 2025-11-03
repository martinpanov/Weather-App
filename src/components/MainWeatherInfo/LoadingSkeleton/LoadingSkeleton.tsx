import { LoadingSkeleton } from '../../LoadingSkeleton/LoadingSkeleton';
import styles from './LoadingSkeleton.module.css';

export const MainWeatherInfoLoadingSkeleton = () => {
  return (
    <div className={styles['main__skeleton-wrapper']}>
      <LoadingSkeleton width="105px" height="160px" className={styles['main__skeleton-degrees']} />
      <div className={styles['main__skeleton']}>
        <LoadingSkeleton width="176px" height="56px" className={styles['main__skeleton-city']} />
        <LoadingSkeleton width="176px" height="28px" className={styles['main__skeleton-time']} />
      </div>
      <div className={styles['main__skeleton']}>
        <LoadingSkeleton width="60px" height="56px" className={styles['main__skeleton-image']} />
        <LoadingSkeleton width="60px" height="28px" className={styles['main__skeleton-weather']} />
      </div>
    </div>
  );
};
