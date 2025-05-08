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

// 관리자 계정 정보 저장 관리
interface AdminInfo {
  admin_id: string;
  name: string;
  role: string;
}
const ADMIN_INFO = "admin_info";
export const AdminAccountStorage = {
  getAdminInfo: (): AdminInfo | null => {
    if (typeof window === "undefined") return null;
    const item = localStorage.getItem(ADMIN_INFO);
    return item ? JSON.parse(item) : null;
  },

  setAdminInfo: (admin: AdminInfo) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(ADMIN_INFO, JSON.stringify(admin));
    }
  },

  removeAdminInfo: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(ADMIN_INFO);
    }
  },
};
