"use client";

import { useState, useEffect, useCallback } from "react";
import { StampRecord } from "@/lib/types";
import { streets } from "@/data/streets";
import { getStamps, addStamp as addStampToStorage } from "@/lib/stamps";

export function useStamps() {
  const [stamps, setStamps] = useState<StampRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setStamps(getStamps());
    setIsLoaded(true);
  }, []);

  const addStamp = useCallback((streetId: string): boolean => {
    const success = addStampToStorage(streetId);
    if (success) {
      setStamps(getStamps());
    }
    return success;
  }, []);

  const hasStamp = useCallback(
    (streetId: string): boolean => {
      return stamps.some((s) => s.streetId === streetId);
    },
    [stamps]
  );

  const progress = {
    acquired: stamps.length,
    total: streets.length,
  };

  // isLoaded を条件に含めないと、プリレンダリング時（0/0）にコンプリート表示が出てしまう
  const isComplete =
    isLoaded && streets.length > 0 && stamps.length >= streets.length;

  return { stamps, isLoaded, addStamp, hasStamp, progress, isComplete };
}
