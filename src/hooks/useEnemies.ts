import { useRef, useState } from "react";
import Enemy from "../entities/Enemy";
import { Position } from "../types";

/**
 * Custom hook to manage enemy entities within the game.
 *
 * This hook handles the spawning and movement of enemies. Enemies
 * are spawned relative to the current camera position to create an
 * effect of an infinite map. The enemies move towards the player's
 * current position, creating a dynamic challenge for the player.
 *
 * @param viewportWidth - The width of the viewport (visible area). Used to determine enemy spawn locations.
 * @param viewportHeight - The height of the viewport (visible area). Used to determine enemy spawn locations.
 * @param cameraPositionRef - A reference to the current camera position. Enemies spawn relative to this position.
 * @param spawnRate - The probability (per frame) of spawning a new enemy. Defaults to 0.01.
 * @returns {Object} The returned object contains:
 * - `enemies`: An array of current enemy entities.
 * - `spawnEnemy`: A function to randomly spawn an enemy relative to the camera position.
 * - `moveEnemies`: A function to move all enemies towards the player's current position.
 */
const useEnemies = (
  viewportWidth: number,
  viewportHeight: number,
  cameraPositionRef: React.RefObject<Position>,
  spawnRate: number = 0.01
) => {
  const enemiesRef = useRef<Enemy[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);

  /**
   * Spawns a new enemy at a random location just outside the current viewport,
   * ensuring that it approaches the player from one of the edges.
   */
  const spawnEnemy = (): void => {
    if (Math.random() < spawnRate) {
      const cameraPosition = cameraPositionRef.current!;

      let spawnX: number = 0;
      let spawnY: number = 0;

      // Randomly choose a side to spawn the enemy from
      switch (Math.floor(Math.random() * 4)) {
        case 0: // Left
          spawnX = cameraPosition.x - Math.random() * viewportWidth;
          spawnY = cameraPosition.y + Math.random() * viewportHeight;
          break;
        case 1: // Right
          spawnX = cameraPosition.x + viewportWidth + Math.random() * viewportWidth;
          spawnY = cameraPosition.y + Math.random() * viewportHeight;
          break;
        case 2: // Top
          spawnX = cameraPosition.x + Math.random() * viewportWidth;
          spawnY = cameraPosition.y - Math.random() * viewportHeight;
          break;
        case 3: // Bottom
          spawnX = cameraPosition.x + Math.random() * viewportWidth;
          spawnY = cameraPosition.y + viewportHeight + Math.random() * viewportHeight;
          break;
      }

      const newEnemy = new Enemy(spawnX, spawnY);
      enemiesRef.current.push(newEnemy);
      setEnemies([...enemiesRef.current]);
    }
  };

  /**
   * Moves all spawned enemies towards the player's current position.
   *
   * @param playerPosition - The current position of the player. Used as the target for enemy movement.
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
