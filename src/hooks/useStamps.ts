"use client";

import { useCallback, useSyncExternalStore } from "react";
import { streets } from "@/data/streets";
import {
  getServerStamps,
  getStamps,
  setStampDesign,
  subscribeStamps,
} from "@/lib/stamps";

export function useStamps() {
  const stamps = useSyncExternalStore(
    subscribeStamps,
    getStamps,
    getServerStamps
  );

  const hasStamp = useCallback(
    (streetId: string): boolean => {
      return stamps.some((s) => s.streetId === streetId);
    },
    [stamps]
  );

  /** 獲得済みなら選んだ絵柄の id。未獲得なら undefined */
  const designIdOf = useCallback(
    (streetId: string): string | undefined => {
      return stamps.find((s) => s.streetId === streetId)?.designId;
    },
    [stamps]
  );

  const progress = {
    acquired: stamps.length,
    total: streets.length,
  };

  // プリレンダリング時はスタンプ0個なので、コンプリート表示が誤って出ることはない
  const isComplete = streets.length > 0 && stamps.length >= streets.length;

  return {
    stamps,
    hasStamp,
    designIdOf,
    changeDesign: setStampDesign,
    progress,
    isComplete,
  };
}
