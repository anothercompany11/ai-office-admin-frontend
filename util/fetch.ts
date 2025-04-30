import { LOGIN_PAGE } from "@/constants/path";
import { useAuthStore } from "@/stores/auth-store";
import { CSRFTokenStorage } from "./storage";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL!;

type FetchValue = unknown;

// queue에 들어갈 요청의 메타 정보
interface QueueConfig {
  url: string;
  options: RequestInit;
  responseType: "json" | "blob";
  noAuth: boolean;
}

interface QueueItem {
  resolve: (value: FetchValue) => void;
  reject: (reason?: Error) => void;
  config: QueueConfig;
}

export class CustomError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.name = "CustomError";
  }
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: Error | null = null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error); // 재발급 실패 → 대기하던 요청 전부 에러 처리
    } else {
      resolve(
        // 재발급 성공 → 같은 파라미터로 apiFetch 재호출
        apiFetch(config.url, config.options, config.responseType, config.noAuth)
      );
    }
  });
  failedQueue = []; // 큐 비우기
};

// accessToken 가져오기
const getAccessToken = () => {
  return useAuthStore.getState().accessToken;
};

// 토큰 재발급
const refreshAccessToken = async () => {
  try {
    const csrfToken = CSRFTokenStorage.getToken();
    if (!csrfToken) throw new CustomError(401, "CSRF 토큰이 없습니다.");

    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ csrf_token: csrfToken }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new CustomError(response.status, "토큰 재발급 실패");
    }

    const data = await response.json();
    if (data.access_token) {
      useAuthStore.getState().setAccessToken(data.access_token);
    }
    if (data.csrf_token) {
      CSRFTokenStorage.setToken(data.csrf_token);
    }

    return data.access_token;
  } catch (error) {
    useAuthStore.getState().clearAuth();
    CSRFTokenStorage.removeToken();
    if (typeof window !== undefined) {
      window.location.href = LOGIN_PAGE;
    }
    throw error instanceof CustomError ? error : new CustomError(500, "토큰 재발급 중 알 수 없는 오류");
  }
};

// fetch 함수
export const apiFetch = async (
  url: string,
  options: RequestInit = {},
  responseType: "json" | "blob" = "json",
  noAuth: boolean = false
) => {
  const fullUrl = BASE_URL + url;

  const fetchWithToken = async (token?: string | null) => {
    const headers = {
      "Content-Type": "application/json",
      ...(noAuth ? {} : { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    };

    const fetchOptions: RequestInit = {
      ...options,
      headers,
      credentials: "include",
    };

    return fetch(fullUrl, fetchOptions);
  };

  let token = getAccessToken();
  const response = await fetchWithToken(token);

  // 401 Unauthorized 처리
  if (response.status === 401 && !noAuth) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        console.log("hhhhh!!!!!!!!!!!!!!!!!!!");
        token = await refreshAccessToken();
        processQueue(null);
      } catch (err) {
        processQueue(err as Error);
        throw err;
      } finally {
        isRefreshing = false;
      }
    }

    return new Promise((resolve, reject) => {
      failedQueue.push({
        resolve,
        reject,
        config: { url, options, responseType, noAuth },
      });
    });
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new CustomError(response.status, errorText || "API 호출 중 오류 발생");
  }

  // 응답 처리
  if (responseType === "blob") {
    return response.blob();
  }

  const contentType = response.headers.get("Content-Type");
  if (contentType?.includes("application/json")) {
    const json = await response.json();
    return json;
  }

  return null;
};

// export async function apiFetch(input: string, init: RequestInit = {}): Promise<unknown> {
//   const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL!;
//   const doFetch = async (token?: string | null) => {
//     const res = await fetch(`${BASE_URL}${input}`, {
//       credentials: "include",
//       ...init,
//       headers: {
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         ...(init.headers || {}),
//       },
//     });

//     // 204(본문 없음) → 바로 null 반환
//     if (res.status === 204) return null;

//     // 정상 JSON 파싱
//     const data = res.headers.get("Content-Type")?.includes("application/json") ? await res.json() : await res.text();

//     if (res.ok) return data;

//     // 401 → 토큰 재발급 후 1회 재시도
//     if (res.status === 401) {
//       const newToken = await ensureFreshToken();
//       if (!newToken) throw new Error("unauthorized");
//       return doFetch(newToken); // 재귀 한 번
//     }

//     // 기타 오류
//     throw new Error(typeof data === "string" ? data : "API error " + res.status);
//   };

//   return doFetch(getAccessToken());
// }
