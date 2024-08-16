import { useEffect, useRef } from "react";
import Player from "../entities/Player";
import { MovementKey } from "../types";

/**
 * A custom hook that manages the player's state, including position and movement,
 * using an instance of the Player class.
 *
 * This hook handles keyboard input to update the player's direction and position in a 2D space.
 * It listens for keydown and keyup events to track the direction in which the player is moving
 * and updates the player's position accordingly on each game loop iteration.
 *
 * @returns {Object}
 * - `playerRef`: A reference to the Player instance, containing the player's current position.
 * - `updatePlayerPosition`: A function that updates the player's position based on the current direction.
 *
 * @example
 * const { playerRef, updatePlayerPosition } = usePlayer();
 *
 * useGameLoop(() => {
 *   updatePlayerPosition();
 *   console.log(playerRef.current.position); // Logs the current player position
 * });
 */
const usePlayer = () => {
  const playerRef = useRef(new Player(400, 300)); // Initialize the player with default position
  const directionRef = useRef<MovementKey | null>(null); // Track the current movement direction

  /**
   * Handles the keydown event to update the player's movement direction.
   *
   * @param {KeyboardEvent} event - The keyboard event triggered by the user's key press.
   */
  const handleKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(key)) {
      directionRef.current = key as MovementKey;
    }
  };

  /**
   * Handles the keyup event to stop the player's movement in the released direction.
   *
   * @param {KeyboardEvent} event - The keyboard event triggered by the user's key release.
   */
  const handleKeyUp = (event: KeyboardEvent): void => {
    const { key } = event;
    if (directionRef.current === key) {
      directionRef.current = null;
    }
  };

  /**
   * Updates the player's position based on the current direction.
   *
   * This function should be called within a game loop to continuously update the player's position.
   */
  const updatePlayerPosition = (): void => {
    const direction = directionRef.current;
    if (direction) {
      playerRef.current.move(direction);
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

  return { playerRef, updatePlayerPosition };
};

export default usePlayer;
