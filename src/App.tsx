import React, { useState } from "react";
import { PLAYER_DEFAULTS } from "./constants";
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
      console.log("Player is dead!");
      setIsGameOver(true);
      stopLoop();
    }
  });

  const handlePlayAgain = () => {
    window.location.reload(); // For now refresh the browser window to restart the game.
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        position: "relative",
      }}
    >
      <div
        style={{
          width: `${viewportWidth}px`,
          height: `${viewportHeight}px`,
          overflow: "hidden",
          position: "relative",
          backgroundImage: "url('/src/assets/terrain.png')",
          backgroundRepeat: "repeat",
          backgroundPosition: `${-cameraPositionRef.current.x}px ${-cameraPositionRef.current.y}px`,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: `${PLAYER_DEFAULTS.WIDTH}px`,
            height: `${PLAYER_DEFAULTS.HEIGHT}px`,
            backgroundColor: "blue",
            left: `${playerRef.current.position.x - cameraPositionRef.current.x}px`,
            top: `${playerRef.current.position.y - cameraPositionRef.current.y}px`,
          }}
        />

        {enemies.map((enemy, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: `${enemy.width}px`,
              height: `${enemy.height}px`,
              backgroundColor: "red",
              left: `${enemy.position.x - cameraPositionRef.current.x}px`,
              top: `${enemy.position.y - cameraPositionRef.current.y}px`,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            color: "white",
            fontSize: "20px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Health: {playerRef.current.health}
        </div>

        {isGameOver && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              fontSize: "48px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <div>Game Over</div>
            <button
              onClick={handlePlayAgain}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "24px",
                backgroundColor: "#fff",
                color: "#000",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
