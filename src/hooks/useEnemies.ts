import { useRef, useState } from "react";
import Enemy from "../entities/Enemy";
import { Position } from "../types";

/**
 * Custom hook to manage enemies in the game.
 * Handles spawning, movement, and tracking of enemies.
 *
 * @param spawnRate - The probability (per frame) of spawning a new enemy.
 * @param areaWidth - The width of the game area for enemy spawning.
 * @param areaHeight - The height of the game area for enemy spawning.
 * @returns An object containing the list of enemies, and functions to spawn and move enemies.
 */
const useEnemies = (spawnRate = 0.01, areaWidth = 800, areaHeight = 600) => {
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);

  /**
   * Spawns a new enemy at a random position within the game area.
   */
  const spawnEnemy = (): void => {
    if (Math.random() < spawnRate) {
      const x = Math.random() * areaWidth;
      const y = Math.random() * areaHeight;
      const newEnemy = new Enemy(x, y);
      enemiesRef.current.push(newEnemy);
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
