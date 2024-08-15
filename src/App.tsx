import { useState } from "react";
import useGameLoop from "./hooks/useGameLoop";

export default function App() {
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 50 });

  const handleGameLoop = () => {
    // Example logic to move the player (this will be expanded later)
    setPlayerPosition((prev) => ({
      x: prev.x + 1,
      y: prev.y + 1,
    }));
  };

  useGameLoop(handleGameLoop);

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
          left: playerPosition.x,
          top: playerPosition.y,
        }}
      />
    </div>
  );
}
