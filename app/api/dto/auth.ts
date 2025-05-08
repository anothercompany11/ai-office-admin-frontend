// 관리자 계정 유형
export enum AdminRole {
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

// 로그인 요청
export interface LoginPostReq {
  login_id: string;
  password: string;
}

// 로그인 응답
export interface LoginPostRes {
  access_token: string;
  token_type: string;
  csrf_token: string;
  admin_id: string;
  name: string;
  role: AdminRole;
}
