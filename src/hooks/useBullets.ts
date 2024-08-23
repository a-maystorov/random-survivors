import { useState, useCallback } from "react";
import Bullet from "../entities/Bullet";

const useBullets = () => {
  const [bullets, setBullets] = useState<Bullet[]>([]);

  const fireBullet = useCallback(
    (x: number, y: number, speed: number, width: number, height: number, color: string) => {
      const newBullet = new Bullet(x, y, speed, width, height, color);
      setBullets((prevBullets) => [...prevBullets, newBullet]);
    },
    []
  );

  const updateBullets = useCallback((screenHeight: number) => {
    setBullets((prevBullets) =>
      prevBullets
        .map((bullet) => {
          bullet.update();
          return bullet;
        })
        .filter((bullet) => !bullet.isOffScreen(screenHeight))
    );
  }, []);

  return {
    bullets,
    fireBullet,
    updateBullets,
  };
};

export default useBullets;
