import { useEffect, useRef } from "react";

/**
 * Custom hook that manages a game loop by repeatedly calling the provided callback function.
 *
 * This hook handles the timing of game updates by calling the provided callback
 * at a regular interval, based on the specified frames per second (FPS). The
 * callback receives `deltaTime` as an argument, which represents the time passed
 * since the last update, allowing for frame-rate-independent updates.
 *
 * @param callback - The function to be called on each frame of the game loop. Receives `deltaTime` as an argument.
 * @param fps - The desired frames per second (FPS) for the game loop. Defaults to 60 FPS.
 * @returns {Function} A function to stop the game loop.
 *
 * @example
 * const stopLoop = useGameLoop((deltaTime) => {
 *   // Update game state or perform actions on each frame, using deltaTime for smooth updates
 * });
 */
const useGameLoop = (callback: (deltaTime: number) => void, fps: number = 60) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const isRunningRef = useRef(true); // Track whether the game loop should run

  const animate = (time: number) => {
    if (!isRunningRef.current) return; // Stop the loop if not running

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

  /**
   * Stops the game loop, preventing further updates from being triggered.
   */
  const stopLoop = () => {
    isRunningRef.current = false;
  };

  return stopLoop;
};

export default useGameLoop;
