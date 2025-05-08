export type StatusType = "success" | "error" | "fail";

export interface ResponseMeta {
  page: number;
  size: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface ResponseErrorDetail {
  [key: string]: string;
}

export interface ResponseError {
  code: string;
  message: string;
  details: ResponseErrorDetail;
}

// 관리자 계정
export interface AdminUser {
  id: string;
  login_id: string;
  name: string;
  is_active: boolean;
  last_login_at: string;
  is_super_admin: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// 리스트 조회 응답
export interface AdminUserListRes {
  status: StatusType;
  code: string;
  message: string;
  data: AdminUser[] | null;
  meta: ResponseMeta;
  errors: ResponseError[] | null;
}

// 관리자 계정 생성 요청
export interface AdminCreateReq {
  login_id: string;
  name: string;
  password: string;
}
