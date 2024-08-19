import React from "react";
import useCamera from "./hooks/useCamera";
import useEnemies from "./hooks/useEnemies";
import useGameLoop from "./hooks/useGameLoop";
import usePlayer from "./hooks/usePlayer";
import { PLAYER_DEFAULTS } from "./constants";

const App: React.FC = () => {
  const viewportWidth = 800;
  const viewportHeight = 600;

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

  useGameLoop((deltaTime) => {
    updatePlayerPosition(deltaTime);
    updateCameraPosition();
    spawnEnemy();
    moveEnemies(playerRef.current);

    if (!playerRef.current.isAlive()) {
      console.log("Player is dead!");
    }
  });

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
        {/* Render player */}
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

        {/* Render enemies */}
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

        {/* Display player's health as text */}
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
      </div>
    </div>
  );
};

export default App;
