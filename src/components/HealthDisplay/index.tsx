import React from "react";
import styles from "./HealthDisplay.module.css";

interface Props {
  health: number;
}

const HealthDisplay: React.FC<Props> = ({ health }) => {
  return <div className={styles.healthDisplay}>Health: {health}</div>;
};

export default HealthDisplay;
