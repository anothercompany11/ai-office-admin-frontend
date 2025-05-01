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

// 로그아웃 요청
export const postLogout = async () => {
  try {
    await apiFetch(`/auth/logout`, {
      method: "POST",
    });
  } catch (err) {
    console.error(err);
    throw new Error("로그아웃에 실패했습니다."); // 에러 다시 던지기
  }
};

// 토큰 재발급 요청
export const postRefreshToken = async (csrf_token: string) => {
  return apiFetch("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ csrf_token }),
  });
};
