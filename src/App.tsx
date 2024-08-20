import React, { useState } from "react";
import Enemies from "./components/Enemies";
import GameContainer from "./components/GameContainer";
import GameOverScreen from "./components/GameOverScreen";
import HealthDisplay from "./components/HealthDisplay";
import Player from "./components/Player";
import useCamera from "./hooks/useCamera";
import useEnemies from "./hooks/useEnemies";
import useGameLoop from "./hooks/useGameLoop";
import usePlayer from "./hooks/usePlayer";

const App: React.FC = () => {
  const viewportWidth = 800;
  const viewportHeight = 600;
  const [isGameOver, setIsGameOver] = useState(false);

  const { playerRef, updatePlayerPosition } = usePlayer();
  const { cameraPositionRef, updateCameraPosition } = useCamera(
    playerRef,
    viewportWidth,
    viewportHeight
  );
  const { enemies, spawnEnemy, moveEnemies } = useEnemies(
    viewportWidth,
    viewportHeight,
    cameraPositionRef
  );

  const stopLoop = useGameLoop((deltaTime) => {
    updatePlayerPosition(deltaTime);
    updateCameraPosition();
    spawnEnemy();
    moveEnemies(playerRef.current);

    if (!playerRef.current.isAlive()) {
      setIsGameOver(true);
      stopLoop();
    }
  });

  const handlePlayAgain = () => {
    window.location.reload();
  };

  return (
    <GameContainer backgroundPosition={cameraPositionRef.current}>
      <Player position={playerRef.current.position} cameraPosition={cameraPositionRef.current} />
      <Enemies enemies={enemies} cameraPosition={cameraPositionRef.current} />
      <HealthDisplay health={playerRef.current.health} />
      {isGameOver && <GameOverScreen onPlayAgain={handlePlayAgain} />}
    </GameContainer>
  );
};

export default App;
