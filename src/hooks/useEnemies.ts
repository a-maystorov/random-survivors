import { useRef, useState } from "react";
import { PLAY_AREA_HEIGHT, PLAY_AREA_WIDTH } from "../constants";
import Enemy from "../entities/Enemy";
import Player from "../entities/Player";
import { Position } from "../types";

/**
 * Custom hook to manage enemies.
 *
 * @param playerRef - A reference to the Player instance.
 * @param viewportWidth - The width of the viewport (visible area).
 * @param viewportHeight - The height of the viewport (visible area).
 * @param spawnRate - The probability (per frame) of spawning a new enemy.
 * @returns An object containing the list of enemies, and functions to spawn and move enemies.
 */
const useEnemies = (
  playerRef: React.RefObject<Player>,
  viewportWidth: number,
  viewportHeight: number,
  spawnRate = 0.01
) => {
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);

  /**
   * Spawns a new enemy at a random position outside the player's viewport.
   */
  const spawnEnemy = (): void => {
    if (Math.random() < spawnRate) {
      const playerPosition = playerRef.current!.position;

      let spawnX: number = 0;
      let spawnY: number = 0;

      // Randomly choose a side to spawn the enemy: 0 = top, 1 = right, 2 = bottom, 3 = left
      const side = Math.floor(Math.random() * 4);

      switch (side) {
        case 0: // Spawn above the viewport
          spawnX = playerPosition.x + Math.random() * viewportWidth - viewportWidth / 2;
          spawnY = playerPosition.y - viewportHeight / 2 - 50; // Spawn 50px above the viewport
          break;
        case 1: // Spawn to the right of the viewport
          spawnX = playerPosition.x + viewportWidth / 2 + 50; // Spawn 50px to the right of the viewport
          spawnY = playerPosition.y + Math.random() * viewportHeight - viewportHeight / 2;
          break;
        case 2: // Spawn below the viewport
          spawnX = playerPosition.x + Math.random() * viewportWidth - viewportWidth / 2;
          spawnY = playerPosition.y + viewportHeight / 2 + 50; // Spawn 50px below the viewport
          break;
        case 3: // Spawn to the left of the viewport
          spawnX = playerPosition.x - viewportWidth / 2 - 50; // Spawn 50px to the left of the viewport
          spawnY = playerPosition.y + Math.random() * viewportHeight - viewportHeight / 2;
          break;
      }

      // Ensure the enemy spawns within the play area boundaries
      spawnX = Math.max(0, Math.min(PLAY_AREA_WIDTH, spawnX));
      spawnY = Math.max(0, Math.min(PLAY_AREA_HEIGHT, spawnY));

      const newEnemy = new Enemy(spawnX, spawnY);
      enemiesRef.current.push(newEnemy);
      setEnemies([...enemiesRef.current]); // Trigger a re-render if needed
    }
  };

  /**
   * Moves all enemies towards the player's current position.
   *
   * @param playerPosition - The current position of the player.
   */
  const moveEnemies = (playerPosition: Position): void => {
    enemiesRef.current.forEach((enemy) => {
      enemy.moveTowards(playerPosition.x, playerPosition.y);
    });
    setEnemies([...enemiesRef.current]); // Trigger a re-render to update enemy positions
  };

  return { enemies, spawnEnemy, moveEnemies };
};

export default useEnemies;
