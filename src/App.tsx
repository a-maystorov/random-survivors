import React from "react";
import Player from "./entities/Player";
import useGameLoop from "./hooks/useGameLoop";
import usePlayerMovement from "./hooks/usePlayerMovement";
import useEnemies from "./hooks/useEnemies";

const App: React.FC = () => {
  const player = new Player(400, 300, 5);
  const { playerPositionRef, updatePlayerPosition } = usePlayerMovement(
    player.initialPosition,
    player.speed
  );
  const { enemies, spawnEnemy, moveEnemies } = useEnemies();

  useGameLoop(() => {
    updatePlayerPosition();
    spawnEnemy();
    moveEnemies(playerPositionRef.current);
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
          left: `${playerPositionRef.current.x}px`,
          top: `${playerPositionRef.current.y}px`,
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
