import { useEffect, useRef } from "react";

/**
 * Custom hook that manages a game loop by repeatedly calling the provided callback function.
 *
 * @param callback - The function to be called on each frame of the game loop.
 * @param fps - The desired frames per second (FPS) for the game loop. Defaults to 60 FPS.
 *
 * @returns void
 *
 * @example
 * useGameLoop(() => {
 *   // Update game state or perform actions on each frame
 * });
 */
const useGameLoop = (callback: () => void, fps: number = 60): void => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;

      if (deltaTime >= 1000 / fps) {
        callback();
        previousTimeRef.current = time;
      }
    } else {
      previousTimeRef.current = time;
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);
};

export default useGameLoop;
