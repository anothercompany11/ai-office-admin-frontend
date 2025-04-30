import { apiFetch } from "@/util/fetch";
import { AdminUserListRes } from "./dto/admin";

// 관리자 계정 리스트 조회
export const getAdminAccountList = (params: { page?: number; size?: number } = {}) =>
  apiFetch(
    `/admin-users?${new URLSearchParams({ page: String(params.page ?? 1), size: String(params.size ?? 10) })}`
  ) as Promise<AdminUserListRes>;

export const changePassword = (body: { current_password: string; new_password: string }) =>
  apiFetch("/admin-users/change-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
