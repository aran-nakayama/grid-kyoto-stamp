import { StampRecord, Street } from "./types";
import { STORAGE_KEY } from "./constants";
import { streets } from "@/data/streets";

// localStorage を React の外部ストアとして扱う。
// useSyncExternalStore から購読することで、SSR/プリレンダリングとの
// ハイドレーション不整合を起こさずにブラウザ側の値を読める。

const EMPTY: StampRecord[] = [];

const listeners = new Set<() => void>();

// useSyncExternalStore は snapshot の参照が変わると再描画する。
// 中身が同じ間は同じ配列を返せるよう、生の文字列と解析結果をキャッシュする
let cachedRaw: string | null = null;
let cachedStamps: StampRecord[] = EMPTY;

function emit(): void {
  for (const listener of listeners) listener();
}

export function subscribeStamps(listener: () => void): () => void {
  listeners.add(listener);
  // 他のタブで押されたスタンプにも追従する
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function getStamps(): StampRecord[] {
  if (typeof window === "undefined") return EMPTY;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedStamps;

  cachedRaw = raw;
  if (!raw) {
    cachedStamps = EMPTY;
    return cachedStamps;
  }
  try {
    const parsed = JSON.parse(raw) as StampRecord[];
    cachedStamps = Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    cachedStamps = EMPTY;
  }
  return cachedStamps;
}

/** プリレンダリング時はスタンプ0個として描画し、ハイドレーション後に実データへ切り替える */
export function getServerStamps(): StampRecord[] {
  return EMPTY;
}

function saveStamps(stamps: StampRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stamps));
  emit();
}

export function addStamp(streetId: string, designId: string): boolean {
  if (hasStamp(streetId)) return false;
  // キャッシュ中の配列を書き換えないよう新しい配列を作る
  saveStamps([
    ...getStamps(),
    { streetId, designId, acquiredAt: new Date().toISOString() },
  ]);
  return true;
}

/** 獲得済みスタンプの絵柄を選び直す */
export function setStampDesign(streetId: string, designId: string): void {
  const stamps = getStamps();
  if (!stamps.some((s) => s.streetId === streetId)) return;
  saveStamps(
    stamps.map((s) => (s.streetId === streetId ? { ...s, designId } : s))
  );
}

export function hasStamp(streetId: string): boolean {
  return getStamps().some((s) => s.streetId === streetId);
}

/** 獲得済みなら選んだ絵柄の id。未獲得なら undefined */
export function getStampDesignId(streetId: string): string | undefined {
  return getStamps().find((s) => s.streetId === streetId)?.designId;
}

export function clearStamps(): void {
  localStorage.removeItem(STORAGE_KEY);
  emit();
}

export function findStreetByToken(token: string, list: Street[] = streets): Street | null {
  return list.find((s) => s.stampToken === token) ?? null;
}

// --- QRを読み込んだときの判定結果 ---------------------------------------
// 「未獲得なので絵柄を選んでもらう / 既に持っている / 無効」の判定は一度きりなので、
// 描画のたびに評価し直さないようストア側に結果を持たせる。

export type ClaimOutcome = "invalid" | "choosing" | "already" | "success";

let lastClaim: { token: string; outcome: ClaimOutcome } | null = null;

/** QRのトークンを判定する。未獲得なら絵柄の選択待ち（"choosing"）になる */
export function startClaim(token: string): void {
  const street = findStreetByToken(token);

  let outcome: ClaimOutcome;
  if (!street) {
    outcome = "invalid";
  } else if (hasStamp(street.id)) {
    outcome = "already";
  } else if (street.designs.length === 1) {
    // 絵柄が1種類しかないストリートは選ぶ意味がないので、そのまま押す
    addStamp(street.id, street.designs[0].id);
    outcome = "success";
  } else {
    outcome = "choosing";
  }

  lastClaim = { token, outcome };
  emit();
}

/** 選ばれた絵柄でスタンプを確定する */
export function completeClaim(token: string, designId: string): void {
  const street = findStreetByToken(token);
  if (!street) {
    lastClaim = { token, outcome: "invalid" };
    emit();
    return;
  }

  addStamp(street.id, designId);
  lastClaim = { token, outcome: "success" };
  emit();
}

export function getClaimOutcome(token: string): ClaimOutcome | null {
  return lastClaim && lastClaim.token === token ? lastClaim.outcome : null;
}

export function getServerClaimOutcome(): ClaimOutcome | null {
  return null;
}
