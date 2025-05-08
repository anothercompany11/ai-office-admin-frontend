import { LOGIN_PAGE } from "@/constants/path";
import { useAuthStore } from "@/stores/auth-store";
import { CSRFTokenStorage, RefreshTokenStorage } from "./storage";

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
const refreshAccessToken = async () => {
  const isDev = process.env.NODE_ENV === "development";
  try {
    const csrfToken = CSRFTokenStorage.getToken();
    if (!csrfToken) throw new CustomError(401, "CSRF 토큰이 없습니다.");

    const refreshPath = isDev ? "/auth/dev/refresh" : "/auth/refresh";

    const body: Record<string, string> = {
      csrf_token: csrfToken,
    };

    // DEV 환경인 경우 리프레쉬 토큰을 body로 전달
    if (isDev) {
      const refreshToken = RefreshTokenStorage.getToken();
      if (!refreshToken) throw new CustomError(401, "refresh token이 없습니다.");
      body.refresh_token = refreshToken;
    }

    const response = await fetch(`${BASE_URL}${refreshPath}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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

    // DEV 환경인 경우 리프레쉬 토큰 업데이트
    if (isDev) {
      RefreshTokenStorage.setToken(data.refresh_token);
    }

    return data.access_token;
  } catch (error) {
    useAuthStore.getState().clearAuth();
    CSRFTokenStorage.removeToken();

    // DEV 환경인 경우 리프레쉬 토큰 스토리지 초기화
    if (isDev) {
      RefreshTokenStorage.removeToken();
    }

    if (typeof window !== "undefined") {
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
      ...(options.headers || {}), // 기존 헤더 먼저
      "Content-Type": "application/json",
      ...(noAuth ? {} : { Authorization: `Bearer ${token}` }), // 새 토큰으로 덮어씀
    };

    const fetchOptions: RequestInit = {
      ...options,
      headers,
      credentials: "include",
    };

    return fetch(fullUrl, fetchOptions);
  };

  const token = getAccessToken();
  const response = await fetchWithToken(token);

  // 401 응답인 경우
  if (response.status === 401 && !noAuth) {
    // 현재 요청을 큐에 추가
    const retryPromise = new Promise<FetchValue>((resolve, reject) => {
      failedQueue.push({ resolve, reject, config: { url, options, responseType, noAuth } });
    });

    // refresh 시작
    if (!isRefreshing) {
      isRefreshing = true;
      refreshAccessToken()
        .then(() => processQueue(null))
        .catch((err) => processQueue(err as Error))
        .finally(() => {
          isRefreshing = false;
        });
    }

    // 큐에 추가한 프로미스를 반환
    return retryPromise;
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
