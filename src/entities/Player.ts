import { Position } from "../types";

class Player {
  initialPosition: Position;
  speed: number;

  constructor(x: number, y: number, speed: number = 5) {
    this.initialPosition = { x, y };
    this.speed = speed;
  }
}

export default Player;
