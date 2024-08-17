import { useRef } from "react";
import Player from "../entities/Player";
import { Position } from "../types";
import { PLAY_AREA_WIDTH, PLAY_AREA_HEIGHT } from "../constants";

/**
 * Custom hook to manage the camera position, following the player.
 *
 * The camera keeps the player centered (or nearly centered) in the viewport while they move within a larger play area.
 *
 * @param playerRef - A reference to the Player instance.
 * @param viewportWidth - The width of the viewport (visible area).
 * @param viewportHeight - The height of the viewport (visible area).
 * @returns The current position of the camera.
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

  const updateCameraPosition = (): void => {
    const playerPosition = playerRef.current!.position;
    cameraPositionRef.current = {
      x: Math.max(
        0,
        Math.min(PLAY_AREA_WIDTH - viewportWidth, playerPosition.x - viewportWidth / 2)
      ),
      y: Math.max(
        0,
        Math.min(PLAY_AREA_HEIGHT - viewportHeight, playerPosition.y - viewportHeight / 2)
      ),
    };
  };

  return { cameraPositionRef, updateCameraPosition };
};

export default useCamera;
