import { FC } from "react";
import styles from "./LoadingSkeleton.module.css";

type Props = {
  width: string;
  height: string;
  className?: string;
};

export const LoadingSkeleton: FC<Props> = ({ width, height, className }) => {
  return (
    <div
      className={`${styles["loading-skeleton"]} ${className}`}
      style={{ width, height }}
    />
  );
};