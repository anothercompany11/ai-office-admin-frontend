import { postLogin, postRefreshToken } from "@/app/api/auth";
import { LOGIN_PAGE } from "@/constants/path";
import { loginSchema } from "@/schema/auth";
import { useAuthStore } from "@/stores/auth-store";
import { CustomError } from "@/util/fetch";
import { CSRFTokenStorage } from "@/util/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// 로그인 훅
export const useLogin = (onSuccess: () => void, onFail: (val: string) => void) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login_id: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await postLogin(data);
      const { access_token, csrf_token } = response;

      if (!access_token) throw new CustomError(500, "액세스 토큰이 없습니다.");

      useAuthStore.getState().setAccessToken(access_token);

      if (csrf_token) {
        CSRFTokenStorage.setToken(csrf_token);
      }

      onSuccess();
    } catch (err) {
      onFail("로그인에 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  });

  return { form, onSubmit, loading };
};

// 토큰 리프레시 훅
export const useRefreshToken = () => {
  return async () => {
    try {
      const csrfToken = CSRFTokenStorage.getToken();
      if (!csrfToken) throw new CustomError(401, "CSRF 토큰이 없습니다.");

      const response = await postRefreshToken(csrfToken);
      const { access_token, csrf_token: newCsrfToken } = response;

      if (access_token) {
        useAuthStore.getState().setAccessToken(access_token);
      }
      if (newCsrfToken) {
        CSRFTokenStorage.setToken(newCsrfToken);
      }

      return access_token;
    } catch (error) {
      useAuthStore.getState().clearAuth();
      CSRFTokenStorage.removeToken();
      window.location.href = LOGIN_PAGE;
      throw error instanceof CustomError ? error : new CustomError(500, "토큰 재발급 중 알 수 없는 오류");
    }
  };
};
