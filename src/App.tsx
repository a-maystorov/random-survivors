import React from "react";
import useGameLoop from "./hooks/useGameLoop";
import usePlayer from "./hooks/usePlayer";
import useEnemies from "./hooks/useEnemies";
import useCamera from "./hooks/useCamera";
import { PLAY_AREA_HEIGHT, PLAY_AREA_WIDTH } from "./constants";

const App: React.FC = () => {
  const viewportWidth = 800;
  const viewportHeight = 600;

  const { playerRef, updatePlayerPosition } = usePlayer();
  const { enemies, spawnEnemy, moveEnemies } = useEnemies(playerRef, viewportWidth, viewportHeight);
  const { cameraPositionRef, updateCameraPosition } = useCamera(
    playerRef,
    viewportWidth,
    viewportHeight
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
        width: `${viewportWidth}px`,
        height: `${viewportHeight}px`,
        overflow: "hidden",
        position: "relative",
        background: "#333",
      }}
    >
      <div
        style={{
          width: `${PLAY_AREA_WIDTH}px`,
          height: `${PLAY_AREA_HEIGHT}px`,
          position: "absolute",
          top: `-${cameraPositionRef.current.y}px`,
          left: `-${cameraPositionRef.current.x}px`,
        }}
      >
        {/* Render Player */}
        <div
          style={{
            width: "20px",
            height: "20px",
            background: "red",
            position: "absolute",
            left: `${playerRef.current.position.x}px`,
            top: `${playerRef.current.position.y}px`,
          }}
        />

        {/* Render Enemies */}
        {enemies.map((enemy, index) => (
          <div
            key={index}
            style={{
              width: "20px",
              height: "20px",
              background: "green",
              position: "absolute",
              left: `${enemy.position.x}px`,
              top: `${enemy.position.y}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
