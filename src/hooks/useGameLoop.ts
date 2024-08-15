import { useEffect, useRef } from "react";

const useGameLoop = (callback: () => void, fps: number = 60) => {
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
