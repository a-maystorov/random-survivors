import React from "react";
import { Position } from "../../types";
import styles from "./GameContainer.module.css";

interface Props {
  children: React.ReactNode;
  backgroundPosition: Position;
}

const GameContainer: React.FC<Props> = ({ children, backgroundPosition }) => {
  return (
    <div className={styles.gameContainer}>
      <div
        className={styles.gameArea}
        style={{
          backgroundImage: "url('/src/assets/terrain.png')",
          backgroundPosition: `${-backgroundPosition.x}px ${-backgroundPosition.y}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GameContainer;
