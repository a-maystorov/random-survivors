import React, { useRef, useState } from "react";
import Enemy from "./entities/Enemy";
import Player from "./entities/Player";
import useGameLoop from "./hooks/useGameLoop";
import usePlayerMovement from "./hooks/usePlayerMovement";

const App: React.FC = () => {
  // Initialize player
  const player = new Player(400, 300);
  const { playerPositionRef, updatePlayerPosition } = usePlayerMovement(
    player.initialPosition,
    player.speed
  );

  // State to hold the enemies
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const enemiesRef = useRef<Enemy[]>([]); // To directly manipulate enemies

  // Game loop
  useGameLoop(() => {
    updatePlayerPosition();

    // Spawning logic (e.g., 1% chance per frame to spawn an enemy)
    if (Math.random() < 0.01) {
      const x = Math.random() * 800;
      const y = Math.random() * 600;
      const newEnemy = new Enemy(x, y);
      enemiesRef.current.push(newEnemy);
    }

    // Move each enemy towards the player
    enemiesRef.current.forEach((enemy) => {
      enemy.moveTowards(playerPositionRef.current.x, playerPositionRef.current.y);
    });

    // Trigger a re-render to update enemy positions
    setEnemies([...enemiesRef.current]);
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
