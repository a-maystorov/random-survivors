import React from "react";
import usePlayerMovement from "./hooks/usePlayerMovement";

const App: React.FC = () => {
  const initialPosition = { x: 50, y: 50 };
  const speed = 5;
  const playerPosition = usePlayerMovement(initialPosition, speed);

  return (
    <div
      style={{
        width: "800px",
        height: "600px",
        background: "#333",
        position: "relative",
      }}
    >
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
