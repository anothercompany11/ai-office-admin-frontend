import { apiFetch } from "@/util/fetch";
import { AdminCreateReq, AdminUserListRes } from "./dto/account";

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

// 관리자 계정 삭제
export const deleteAdminAccount = (adminId: string): Promise<void> =>
  apiFetch(`/admin-users/${adminId}`, {
    method: "DELETE",
  });

// 관리자 비밀번호 초기화
export const resetAdminPassword = (adminId: string): Promise<void> =>
  apiFetch(`/admin-users/${adminId}/reset-password`, {
    method: "POST",
  });

// 관리자 계정 생성
export const createAdminAccount = (body: AdminCreateReq): Promise<void> =>
  apiFetch(`/admin-users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
