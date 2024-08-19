import { ENEMY_DEFAULTS } from "../constants";
import { Position } from "../types";
import Player from "./Player";

/**
 * Represents an enemy in the game, managing its position, movement, and collision detection.
 *
 * The Enemy class handles the logic for positioning the enemy within a 2D space, moving it towards a target
 * (typically the player), and detecting collisions with the player.
 */
class Enemy {
  position: Position;
  speed: number;
  width: number;
  height: number;

  /**
   * Creates a new Enemy instance.
   *
   * @param {number} x - The initial x-coordinate of the enemy.
   * @param {number} y - The initial y-coordinate of the enemy.
   * @param {number} [width=ENEMY_DEFAULTS.WIDTH] - The width of the enemy's bounding box.
   * @param {number} [height=ENEMY_DEFAULTS.HEIGHT] - The height of the enemy's bounding box.
   * @param {number} [speed=ENEMY_DEFAULTS.SPEED] - The speed at which the enemy moves.
   */
  constructor(
    x: number,
    y: number,
    width: number = ENEMY_DEFAULTS.WIDTH,
    height: number = ENEMY_DEFAULTS.HEIGHT,
    speed: number = ENEMY_DEFAULTS.SPEED
  ) {
    this.position = { x, y };
    this.width = width;
    this.height = height;
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

  /**
   * Checks if this enemy is colliding with the player.
   *
   * @param player - The player to check collision against.
   * @returns `true` if colliding, otherwise `false`.
   */
  isCollidingWith(player: Player): boolean {
    return (
      this.position.x < player.position.x + player.width &&
      this.position.x + this.width > player.position.x &&
      this.position.y < player.position.y + player.height &&
      this.position.y + this.height > player.position.y
    );
  }
}

export default Enemy;
