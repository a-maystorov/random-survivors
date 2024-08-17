import { useRef } from "react";
import Player from "../entities/Player";
import { Position } from "../types";

/**
 * Custom hook to manage the camera position, ensuring it follows the player.
 *
 * This hook dynamically adjusts the camera's position to keep the player
 * centered within the viewport as they move. By not restricting the camera
 * movement within specific boundaries, the map gives an illusion of being infinite.
 *
 * @param playerRef - A reference to the Player instance, used to track the player's position.
 * @param viewportWidth - The width of the viewport (visible area), used to calculate the camera's horizontal position.
 * @param viewportHeight - The height of the viewport (visible area), used to calculate the camera's vertical position.
 * @returns {Object} The returned object contains:
 * - `cameraPositionRef`: A reference to the current camera position, which updates based on the player's movement.
 * - `updateCameraPosition`: A function that recalculates and updates the camera's position, keeping the player centered.
 */
const useCamera = (
  playerRef: React.RefObject<Player>,
  viewportWidth: number,
  viewportHeight: number
) => {
  const cameraPositionRef = useRef<Position>({
    x: playerRef.current!.position.x - viewportWidth / 2,
    y: playerRef.current!.position.y - viewportHeight / 2,
  });

  /**
   * Updates the camera position to keep the player centered in the viewport.
   *
   * This function recalculates the camera's position based on the player's current
   * position, ensuring the player remains in the center of the visible area.
   */
  const updateCameraPosition = (): void => {
    const playerPosition = playerRef.current!.position;
    cameraPositionRef.current = {
      x: playerPosition.x - viewportWidth / 2,
      y: playerPosition.y - viewportHeight / 2,
    };
  };

  return { cameraPositionRef, updateCameraPosition };
};

export default useCamera;
