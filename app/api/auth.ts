import { apiFetch } from "@/util/fetch";
import { LoginPostReq } from "./dto/auth";

// 로그인 요청
export const postLogin = async (data: LoginPostReq) => {
  return apiFetch(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    "json",
    true
  );
};

// 토큰 재발급 요청
export const postRefreshToken = async (csrf_token: string) => {
  return apiFetch(
    "/auth/refresh-token",
    {
      method: "POST",
      body: JSON.stringify({ csrf_token }),
    },
    "json",
    true
  );
};
