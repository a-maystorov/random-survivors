import { MovementKey, Position } from "../types";
import Enemy from "./Enemy";
import { PLAYER_DEFAULTS } from "../constants";

/**
 * Represents the player in the game, managing their position, movement, health, and invincibility.
 *
 * The Player class encapsulates the logic for moving the player within a 2D space based on keyboard input,
 * managing the player's health, handling collisions with enemies, and providing temporary invincibility after taking damage.
 */
class Player {
  position: Position;
  speed: number;
  width: number;
  height: number;
  health: number;
  invincible: boolean;
  invincibilityDuration: number;
  invincibilityTimer: number;

  /**
   * Creates a new Player instance with specified or default values.
   *
   * @param {number} [x=PLAYER_DEFAULTS.POSITION_X] - The initial x-coordinate of the player.
   * @param {number} [y=PLAYER_DEFAULTS.POSITION_Y] - The initial y-coordinate of the player.
   * @param {number} [width=PLAYER_DEFAULTS.WIDTH] - The width of the player's bounding box.
   * @param {number} [height=PLAYER_DEFAULTS.HEIGHT] - The height of the player's bounding box.
   * @param {number} [speed=PLAYER_DEFAULTS.SPEED] - The speed at which the player moves.
   * @param {number} [health=PLAYER_DEFAULTS.HEALTH] - The initial health of the player.
   * @param {number} [invincibilityDuration=1000] - The duration of invincibility after taking damage (in milliseconds).
   */
  constructor(
    x: number = PLAYER_DEFAULTS.POSITION_X,
    y: number = PLAYER_DEFAULTS.POSITION_Y,
    width: number = PLAYER_DEFAULTS.WIDTH,
    height: number = PLAYER_DEFAULTS.HEIGHT,
    speed: number = PLAYER_DEFAULTS.SPEED,
    health: number = PLAYER_DEFAULTS.HEALTH,
    invincibilityDuration: number = 1000 // Default 1 second of invincibility
  ) {
    this.position = { x, y };
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.health = health;
    this.invincible = false;
    this.invincibilityDuration = invincibilityDuration;
    this.invincibilityTimer = 0;
  }

  /**
   * Moves the player based on the provided direction key.
   *
   * This method updates the player's position based on the direction of movement and the player's speed.
   *
   * @param {MovementKey} direction - The direction in which to move the player.
   * Valid values include "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", and "d".
   */
  move(direction: MovementKey): void {
    switch (direction) {
      case "ArrowUp":
      case "w":
        this.position.y -= this.speed;
        break;
      case "ArrowDown":
      case "s":
        this.position.y += this.speed;
        break;
      case "ArrowLeft":
      case "a":
        this.position.x -= this.speed;
        break;
      case "ArrowRight":
      case "d":
        this.position.x += this.speed;
        break;
    }
  }

  /**
   * Reduces the player's health by a specified amount if not invincible.
   * Starts the invincibility timer after taking damage.
   *
   * @param {number} amount - The amount to reduce the player's health by.
   */
  takeDamage(amount: number): void {
    if (!this.invincible) {
      this.health = Math.max(this.health - amount, 0);
      this.invincible = true;
      this.invincibilityTimer = this.invincibilityDuration;
    }
  }

  /**
   * Manages the player's invincibility state by updating the timer.
   *
   * @param {number} deltaTime - The time passed since the last update (in milliseconds).
   */
  updateInvincibility(deltaTime: number): void {
    if (this.invincible) {
      this.invincibilityTimer -= deltaTime;
      if (this.invincibilityTimer <= 0) {
        this.invincible = false;
        this.invincibilityTimer = 0;
      }
    }
  }

  /**
   * Checks if this player is colliding with an enemy.
   *
   * @param {Enemy} enemy - The enemy to check collision against.
   * @returns {boolean} `true` if colliding, otherwise `false`.
   */
  isCollidingWith(enemy: Enemy): boolean {
    return (
      this.position.x < enemy.position.x + enemy.width &&
      this.position.x + this.width > enemy.position.x &&
      this.position.y < enemy.position.y + enemy.height &&
      this.position.y + this.height > enemy.position.y
    );
  }

  /**
   * Checks if the player is still alive.
   *
   * @returns {boolean} `true` if the player's health is greater than 0, otherwise `false`.
   */
  isAlive(): boolean {
    return this.health > 0;
  }
}

export default Player;
