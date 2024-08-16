import { Position } from "../types";

/**
 * Represents an enemy in the game, managing its position and movement.
 *
 * The Enemy class handles the logic for positioning the enemy within a 2D space and moving it towards a target
 * (typically the player) based on its speed.
 */
class Enemy {
  position: Position;
  speed: number;

  /**
   * Creates a new Enemy instance.
   *
   * @param {number} x - The initial x-coordinate of the enemy.
   * @param {number} y - The initial y-coordinate of the enemy.
   * @param {number} [speed=1] - The speed at which the enemy moves. Defaults to 1 if not provided.
   */
  constructor(x: number, y: number, speed: number = 1) {
    this.position = { x, y };
    this.speed = speed;
  }

  /**
   * Moves the enemy towards a specified target position.
   *
   * This method updates the enemy's position, moving it towards the target coordinates (`targetX`, `targetY`).
   * The movement is proportional to the distance between the current position and the target, scaled by the enemy's speed.
   *
   * @param {number} targetX - The x-coordinate of the target position.
   * @param {number} targetY - The y-coordinate of the target position.
   */
  moveTowards(targetX: number, targetY: number) {
    const dx = targetX - this.position.x;
    const dy = targetY - this.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      this.position.x += (dx / distance) * this.speed;
      this.position.y += (dy / distance) * this.speed;
    }
  }
}

export default Enemy;
