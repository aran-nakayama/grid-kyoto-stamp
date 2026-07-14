import { StampRecord, Street } from "./types";
import { STORAGE_KEY } from "./constants";

export function getStamps(): StampRecord[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as StampRecord[];
  } catch {
    return [];
  }
}

function saveStamps(stamps: StampRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stamps));
}

export function addStamp(streetId: string): boolean {
  const stamps = getStamps();
  if (stamps.some((s) => s.streetId === streetId)) return false;
  stamps.push({ streetId, acquiredAt: new Date().toISOString() });
  saveStamps(stamps);
  return true;
}

export function hasStamp(streetId: string): boolean {
  return getStamps().some((s) => s.streetId === streetId);
}

export function clearStamps(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function findStreetByToken(token: string, streets: Street[]): Street | null {
  return streets.find((s) => s.stampToken === token) ?? null;
}
