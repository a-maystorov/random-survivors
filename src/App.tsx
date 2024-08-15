import React from "react";
import Player from "./entities/Player";
import useGameLoop from "./hooks/useGameLoop";
import usePlayerMovement from "./hooks/usePlayerMovement";

const App: React.FC = () => {
  const player = new Player(400, 300, 5);
  const { playerPosition, updatePosition } = usePlayerMovement(
    player.initialPosition,
    player.speed
  );

  useGameLoop(() => {
    updatePosition();
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
          left: `${playerPosition.x}px`,
          top: `${playerPosition.y}px`,
        }}
      />
    </div>
  );
};

export default App;
