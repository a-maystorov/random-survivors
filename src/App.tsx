import React, { useState, useEffect } from "react";
import Enemies from "./components/Enemies";
import GameContainer from "./components/GameContainer";
import GameOverScreen from "./components/GameOverScreen";
import HealthDisplay from "./components/HealthDisplay";
import Player from "./components/Player";
import useCamera from "./hooks/useCamera";
import useEnemies from "./hooks/useEnemies";
import useGameLoop from "./hooks/useGameLoop";
import usePlayer from "./hooks/usePlayer";
import useBullets from "./hooks/useBullets"; // Import the useBullets hook

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
  const { bullets, fireBullet, updateBullets } = useBullets(); // Use the useBullets hook

  const stopLoop = useGameLoop((deltaTime) => {
    updatePlayerPosition(deltaTime);
    updateCameraPosition();
    spawnEnemy();
    moveEnemies(playerRef.current);
    updateBullets(viewportHeight); // Update bullets and handle their movement

    if (!playerRef.current.isAlive()) {
      setIsGameOver(true);
      stopLoop();
    }
  });

  // Handle spacebar press to fire bullets
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        const playerPosition = playerRef.current.position;
        fireBullet(
          playerPosition.x + playerRef.current.width / 2,
          playerPosition.y,
          7,
          4,
          10,
          "yellow"
        ); // Adjust bullet's start position to player's center
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fireBullet, playerRef]);

  const handlePlayAgain = () => {
    window.location.reload();
  };

  return (
    <GameContainer backgroundPosition={cameraPositionRef.current}>
      <Player position={playerRef.current.position} cameraPosition={cameraPositionRef.current} />
      <Enemies enemies={enemies} cameraPosition={cameraPositionRef.current} />
      <HealthDisplay health={playerRef.current.health} />
      {bullets.map((bullet, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: bullet.position.x - cameraPositionRef.current.x,
            top: bullet.position.y - cameraPositionRef.current.y,
            width: bullet.width,
            height: bullet.height,
            backgroundColor: bullet.color,
          }}
        />
      ))}
      {isGameOver && <GameOverScreen onPlayAgain={handlePlayAgain} />}
    </GameContainer>
  );
};

export default App;
