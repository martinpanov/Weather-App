import styles from './LoadingSkeleton.module.css';

type Props = {
  width: string;
  height: string;
  className?: string;
};

export const LoadingSkeleton = ({ width, height, className }: Props) => {
  return <div className={`${styles['loading-skeleton']} ${className}`} style={{ width, height }} />;
};
