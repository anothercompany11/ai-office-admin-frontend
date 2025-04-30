import { useAuthStore } from "@/stores/auth-store";
import { CSRFTokenStorage } from "@/util/storage";

// 단순 in-memory 전역 (새 탭마다 1개)
let refreshPromise: Promise<string | null> | null = null;

/** accessToken 반환 (zustand 등 원하는 스토어 사용) */
export const getAccessToken = () => useAuthStore.getState().accessToken;

/** accessToken 저장 */
export const setAccessToken = (t: string | null) => useAuthStore.getState().setAccessToken(t);

/** CSRF 토큰 스토리지 래퍼 */
export const getCsrf = () => CSRFTokenStorage.getToken();
export const setCsrf = (v: string) => CSRFTokenStorage.setToken(v);
export const clearCsrf = () => CSRFTokenStorage.removeToken();

/** 401 이 왔을 때 한 번만 돌도록 잠금 */
export async function ensureFreshToken() {
  const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL!;
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const csrf = getCsrf();
      if (!csrf) throw new Error("no CSRF");

      const res = await fetch(`${BASE_URL}/api/admin/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csrf_token: csrf }),
      });

      if (!res.ok) throw new Error("refresh fail");

      const json = await res.json();
      setAccessToken(json.access_token ?? null);
      if (json.csrf_token) setCsrf(json.csrf_token);
      return json.access_token ?? null;
    })()
      .catch((err) => {
        // 실패 시 토큰/스토리지 초기화
        setAccessToken(null);
        clearCsrf();
        return null;
      })
      .finally(() => {
        refreshPromise = null; // 다음 401 대비 unlock
      });
  }
  return refreshPromise;
}
