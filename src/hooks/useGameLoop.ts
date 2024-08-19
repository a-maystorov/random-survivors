import { useEffect, useRef } from "react";

/**
 * Custom hook that manages a game loop by repeatedly calling the provided callback function.
 *
 * @param callback - The function to be called on each frame of the game loop. Receives `deltaTime` as an argument.
 * @param fps - The desired frames per second (FPS) for the game loop. Defaults to 60 FPS.
 *
 * @returns void
 *
 * @example
 * useGameLoop((deltaTime) => {
 *   // Update game state or perform actions on each frame, using deltaTime for smooth updates
 * });
 */
const useGameLoop = (callback: (deltaTime: number) => void, fps: number = 60): void => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;

      if (deltaTime >= 1000 / fps) {
        callback(deltaTime);
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
