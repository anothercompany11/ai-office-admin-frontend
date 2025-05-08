import { postLogin, postLogout } from "@/app/api/auth";
import { loginSchema } from "@/schema/auth";
import { useAuthStore } from "@/stores/auth-store";
import { CustomError } from "@/util/fetch";
import { AdminAccountStorage, CSRFTokenStorage, RefreshTokenStorage } from "@/util/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
      const isDev = process.env.NODE_ENV === "development";
      const response = await postLogin(data);
      const { access_token, csrf_token, admin_id, name, role } = response;

      if (!access_token) throw new CustomError(500, "액세스 토큰이 없습니다.");
      const adminInfo = {
        admin_id,
        name,
        role,
      };

      useAuthStore.getState().setAccessToken(access_token);
      AdminAccountStorage.setAdminInfo(adminInfo);

      if (csrf_token) {
        CSRFTokenStorage.setToken(csrf_token);
      }

      // 개발 환경일 경우 http-only 사용하지 않기 때문에 로컬 스토리지 저장
      if (isDev) {
        RefreshTokenStorage.setToken(response.refresh_token);
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

// 로그아웃 훅
export const usePostLogout = () => {
  const onSubmit = async (onSuccess: () => void) => {
    try {
      // 0.4초 대기
      await new Promise((resolve) => setTimeout(resolve, 400));

      await postLogout();
      toast("로그아웃 성공");
      await new Promise((resolve) => setTimeout(resolve, 600));
      onSuccess();
    } catch (err: unknown) {
      if (!err) return;
      toast("잠시 후 다시 시도해주세요");
    } finally {
      useAuthStore.getState().clearAuth();
      AdminAccountStorage.removeAdminInfo();

      // DEV 환경인 경우 리프레쉬 토큰 스토리지 초기화
      const isDev = process.env.NODE_ENV === "development";
      if (isDev) {
        RefreshTokenStorage.removeToken();
      }
    }
  };

  return { onSubmit };
};
