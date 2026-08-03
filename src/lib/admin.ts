import { sha256Hex } from "./sha256";

const ADMIN_SESSION_KEY = "grid-kyoto-stamp-admin-session";
const ADMIN_PASSWORD_HASH = "89a047a81917e001cae07e11a19d20307745ac39c2f547eaccc2244ccdab20da";

const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

async function sha256(text: string): Promise<string> {
  // crypto.subtle は https と localhost でしか使えない。
  // LAN IP 経由の開発サーバー（http）では undefined になるため純JS実装に切り替える
  if (typeof crypto === "undefined" || !crypto.subtle) {
    return sha256Hex(text);
  }
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyPassword(input: string): Promise<boolean> {
  const hash = await sha256(input);
  return hash === ADMIN_PASSWORD_HASH;
}

/** ログイン状態も sessionStorage が持つ外部の状態として購読する */
export function subscribeAdminAuth(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

/** プリレンダリング時は未ログインとして描画し、ハイドレーション後に実際の状態へ切り替える */
export function getServerAdminAuthenticated(): boolean {
  return false;
}

export function setAdminAuthenticated(): void {
  sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
  emit();
}

export function adminLogout(): void {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  emit();
}
