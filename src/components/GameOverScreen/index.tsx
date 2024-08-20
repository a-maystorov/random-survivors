import React from "react";
import styles from "./GameOverScreen.module.css";

interface Props {
  onPlayAgain: () => void;
}

const GameOverScreen: React.FC<Props> = ({ onPlayAgain }) => {
  return (
    <div className={styles.gameOverScreen}>
      <div>Game Over</div>
      <button className={styles.playAgainButton} onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default GameOverScreen;
