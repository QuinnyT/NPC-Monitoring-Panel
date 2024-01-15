import { useCallback, useEffect, useRef } from "react";
import { useRedis } from "./use-redis";

export const useIntervalAsync = (
  fn: () => Promise<unknown>,
  ms: number,
) => {
  const timeout = useRef<number>();
  const mountedRef = useRef(false);
  const { targetId } = useRedis()

  const run = useCallback(async () => {
    await fn();
    if (mountedRef.current) {
      timeout.current = window.setTimeout(run, ms);
    }
  }, [fn, ms, targetId]);

  useEffect(() => {
    mountedRef.current = true;
    run();
    return () => {
      mountedRef.current = false;
      window.clearTimeout(timeout.current);
    };
  }, []);
};
