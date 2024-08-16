import { useEffect, useRef } from "react";
import { Position } from "../types";

type MovementKey = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight" | "w" | "a" | "s" | "d";

/**
 * Calculates the new position of the player based on the direction key pressed.
 *
 * @param key - The key pressed by the user to move the player.
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
 * Custom hook to manage the player's movement in a 2D space.
 *
 * @param initialPosition - The starting position of the player as an object with `x` and `y` coordinates.
 * @param speed - The speed at which the player should move with each key press.
 * @returns An object containing a reference to the player's current position (`playerPositionRef`),
 *          and a function to update the player's position (`updatePlayerPosition`).
 *
 * @example
 * const { playerPositionRef, updatePlayerPosition } = usePlayerMovement({ x: 0, y: 0 }, 5);
 *
 * useGameLoop(() => {
 *   updatePlayerPosition();
 * });
 */
const usePlayerMovement = (initialPosition: Position, speed: number) => {
  const playerPositionRef = useRef<Position>(initialPosition);
  const directionRef = useRef<MovementKey | null>(null);

  /**
   * Handles keydown events and updates the direction based on the key pressed.
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
   * Updates the player's position based on the current direction stored in `directionRef`.
   * Intended to be called within a game loop to continuously update the player's position.
   */
  const updatePlayerPosition = (): void => {
    const direction = directionRef.current;
    if (direction) {
      playerPositionRef.current = getNewPosition(direction, playerPositionRef.current, speed);
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

  return { playerPositionRef, updatePlayerPosition };
};

export default usePlayerMovement;
