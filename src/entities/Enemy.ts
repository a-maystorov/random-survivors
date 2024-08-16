import { Position } from "../types";

class Enemy {
  position: Position;
  speed: number;

  constructor(x: number, y: number, speed: number = 1) {
    this.position = { x, y };
    this.speed = speed;
  }

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
