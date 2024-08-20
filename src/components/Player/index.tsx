import React from "react";
import { Position } from "../../types";
import styles from "./Player.module.css";

interface Props {
  position: Position;
  cameraPosition: Position;
}

const Player: React.FC<Props> = ({ position, cameraPosition }) => {
  return (
    <div
      className={styles.player}
      style={{
        left: `${position.x - cameraPosition.x}px`,
        top: `${position.y - cameraPosition.y}px`,
      }}
    />
  );
};

export default Player;
