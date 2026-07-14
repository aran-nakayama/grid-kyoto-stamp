const ADMIN_SESSION_KEY = "grid-kyoto-stamp-admin-session";
const ADMIN_PASSWORD_HASH = "89a047a81917e001cae07e11a19d20307745ac39c2f547eaccc2244ccdab20da";

async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyPassword(input: string): Promise<boolean> {
  const hash = await sha256(input);
  return hash === ADMIN_PASSWORD_HASH;
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

export function setAdminAuthenticated(): void {
  sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
}

export function adminLogout(): void {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}
