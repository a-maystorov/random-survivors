import React from "react";
import useGameLoop from "./hooks/useGameLoop";
import usePlayer from "./hooks/usePlayer";
import useEnemies from "./hooks/useEnemies";

const App: React.FC = () => {
  const { playerRef, updatePlayerPosition } = usePlayer();
  const { enemies, spawnEnemy, moveEnemies } = useEnemies();

  useGameLoop(() => {
    updatePlayerPosition();
    spawnEnemy();
    moveEnemies(playerRef.current.position);
  });

  return (
    <div
      style={{
        width: "800px",
        height: "600px",
        background: "#333",
        position: "relative",
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
  );
};

export default App;
