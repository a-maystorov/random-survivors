import React from "react";
import { Position } from "../../types";
import styles from "./Enemies.module.css";

interface Props {
  enemies: Array<{
    position: Position;
    width: number;
    height: number;
  }>;
  cameraPosition: Position;
}

const Enemies: React.FC<Props> = ({ enemies, cameraPosition }) => {
  return (
    <>
      {enemies.map((enemy, index) => (
        <div
          key={index}
          className={styles.enemy}
          style={{
            width: `${enemy.width}px`,
            height: `${enemy.height}px`,
            left: `${enemy.position.x - cameraPosition.x}px`,
            top: `${enemy.position.y - cameraPosition.y}px`,
          }}
        />
      ))}
    </>
  );
};

export default Enemies;
