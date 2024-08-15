import { useEffect, useRef, useState } from "react";

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
 * @returns An object containing the player's current position, and a function to update the position.
 */
const usePlayerMovement = (initialPosition: Position, speed: number) => {
  const [playerPosition, setPlayerPosition] = useState<Position>(initialPosition);
  const directionRef = useRef<MovementKey | null>(null);

  /**
   * Handles keydown events and updates the direction based on the key pressed.
   *
   * @remarks
   * This function sets the directionRef to the key pressed, allowing the game loop to update the player's position
   * based on this direction.
   *
   * @param event - The keyboard event triggered by the user's key press.
   */
  const handleKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(key)) {
      directionRef.current = key as MovementKey;
    }
  };

  /**
   * Handles keyup events and clears the direction when the key is released.
   *
   * @remarks
   * This function checks if the key released matches the current directionRef. If so, it sets directionRef to null,
   * stopping the movement in that direction. This helps prevent unintended stops during rapid direction changes.
   *
   * @param event - The keyboard event triggered by the user's key release.
   */
  const handleKeyUp = (event: KeyboardEvent): void => {
    const { key } = event;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(key)) {
      if (directionRef.current === key) {
        directionRef.current = null;
      }
    }
  };

  /**
   * Updates the player's position based on the current direction.
   *
   * @remarks
   * This function is intended to be called within a game loop. It updates the player's position using the
   * latest direction stored in directionRef.
   */
  const updatePosition = (): void => {
    const direction = directionRef.current;
    if (direction) {
      setPlayerPosition((prev) => {
        const newPosition = getNewPosition(direction, prev, speed);
        return newPosition;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return { playerPosition, updatePosition };
};

export default usePlayerMovement;
