import { useEffect, useRef } from "react";
import Player from "../entities/Player";
import { MovementKey } from "../types";

/**
 * A custom hook that manages the player's state, including position, movement, health, and invincibility,
 * using an instance of the Player class.
 *
 * This hook handles keyboard input to update the player's direction and position in a 2D space.
 * It also manages the player's invincibility status, preventing the player from taking damage too rapidly.
 * The player's position and invincibility state are updated on each game loop iteration.
 *
 * @returns {Object}
 * - `playerRef`: A reference to the Player instance, containing the player's current state (position, health, invincibility, etc.).
 * - `updatePlayerPosition`: A function that updates the player's position and manages the invincibility state based on the current direction and deltaTime.
 *
 * @example
 * const { playerRef, updatePlayerPosition } = usePlayer();
 *
 * useGameLoop((deltaTime) => {
 *   updatePlayerPosition(deltaTime);
 *   console.log(playerRef.current.position); // Logs the current player position
 * });
 */
const usePlayer = () => {
  const playerRef = useRef(new Player());
  const directionRef = useRef<MovementKey | null>(null);

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
   * Updates the player's position based on the current direction and manages the invincibility state.
   *
   * This function should be called within a game loop to continuously update the player's position
   * and manage the invincibility timer, preventing rapid successive damage.
   *
   * @param {number} deltaTime - The time passed since the last update (in milliseconds).
   */
  const updatePlayerPosition = (deltaTime: number): void => {
    const direction = directionRef.current;
    if (direction) {
      playerRef.current.move(direction);
    }
    playerRef.current.updateInvincibility(deltaTime); // Update the invincibility timer
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
