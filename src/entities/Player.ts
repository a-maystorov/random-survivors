import { MovementKey, Position } from "../types";

/**
 * Represents the player in the game, managing their position and movement.
 *
 * The Player class encapsulates the logic for moving the player within a 2D space based on keyboard input.
 * The position is updated according to the player's speed and the direction of movement.
 */
class Player {
  position: Position;
  speed: number;

  /**
   * Creates a new Player instance.
   *
   * @param {number} x - The initial x-coordinate of the player.
   * @param {number} y - The initial y-coordinate of the player.
   * @param {number} [speed=5] - The speed at which the player moves. Defaults to 5 if not provided.
   */
  constructor(x: number, y: number, speed: number = 5) {
    this.position = { x, y };
    this.speed = speed;
  }

  /**
   * Moves the player based on the provided direction key.
   *
   * This method updates the player's position based on the direction of movement and the player's speed.
   *
   * @param {MovementKey} direction - The direction in which to move the player.
   * Valid values include "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", and "d".
   */
  move(direction: MovementKey) {
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
}

export default Player;
