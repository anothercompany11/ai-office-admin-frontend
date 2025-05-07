// CSRF 토큰 저장 관리
export const CSRFTokenStorage = {
  getToken: (): string | null => {
    return typeof window !== "undefined" ? localStorage.getItem("csrf_token") : null;
  },

  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("csrf_token", token);
    }
  },

  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("csrf_token");
    }
  },
};

// Refresh Token 저장 관리
const REFRESH_TOKEN = "refresh_token";
export const RefreshTokenStorage = {
  getToken: (): string | null => {
    return typeof window !== "undefined" ? localStorage.getItem(REFRESH_TOKEN) : null;
  },

  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(REFRESH_TOKEN, token);
    }
  },

  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(REFRESH_TOKEN);
    }
  },
};
