import { useState, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

type MovementKey = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight" | "w" | "a" | "s" | "d";

/**
 * Updates the player's position based on the movement key pressed.
 *
 * @param key - The key pressed by the user for movement.
 * @param prev - The previous position of the player.
 * @param speed - The speed at which the player should move.
 * @returns The new position of the player after applying movement.
 */
const getNewPosition = (key: MovementKey, prev: Position, speed: number): Position => {
  switch (key) {
    case "ArrowUp":
    case "w":
      return { ...prev, y: prev.y - speed };
    case "ArrowDown":
    case "s":
      return { ...prev, y: prev.y + speed };
    case "ArrowLeft":
    case "a":
      return { ...prev, x: prev.x - speed };
    case "ArrowRight":
    case "d":
      return { ...prev, x: prev.x + speed };
    default:
      return prev;
  }
};

/**
 * Custom hook to manage player movement in a 2D space.
 *
 * @param initialPosition - The starting position of the player as an object with `x` and `y` coordinates.
 * @param speed - The speed at which the player should move with each key press.
 * @returns The current position of the player as an object with `x` and `y` coordinates.
 *
 * @example
 * const playerPosition = usePlayerMovement({ x: 0, y: 0 }, 5);
 *
 * // playerPosition will update as the user presses arrow keys or WASD keys
 */
const usePlayerMovement = (initialPosition: Position, speed: number): Position => {
  const [playerPosition, setPlayerPosition] = useState<Position>(initialPosition);

  /**
   * Handles keydown events and updates the player's position based on the key pressed.
   *
   * @param event - The keyboard event triggered by the user's key press.
   */
  const handleKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;

    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(key)) {
      setPlayerPosition((prev) => getNewPosition(key as MovementKey, prev, speed));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return playerPosition;
};

export default usePlayerMovement;
