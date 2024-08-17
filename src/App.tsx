import React from "react";
import useCamera from "./hooks/useCamera";
import useEnemies from "./hooks/useEnemies";
import useGameLoop from "./hooks/useGameLoop";
import usePlayer from "./hooks/usePlayer";

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

  useGameLoop(() => {
    updatePlayerPosition();
    updateCameraPosition();
    spawnEnemy();
    moveEnemies(playerRef.current.position);
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
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
            width: "30px",
            height: "30px",
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
              width: "30px",
              height: "30px",
              backgroundColor: "red",
              left: `${enemy.position.x - cameraPositionRef.current.x}px`,
              top: `${enemy.position.y - cameraPositionRef.current.y}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
