import { Position } from "../types";

class Bullet {
  position: Position;
  speed: number;
  width: number;
  height: number;
  color: string;

  constructor(x: number, y: number, speed: number, width: number, height: number, color: string) {
    this.position = { x, y };
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  update() {
    // Move the bullet upwards by decreasing the y position
    this.position.y -= this.speed;
  }

  isOffScreen(screenHeight: number): boolean {
    return this.position.y + this.height < 0;
  }
}

export default Bullet;
