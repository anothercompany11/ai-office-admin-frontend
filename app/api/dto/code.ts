type StatusType = "success" | "error" | "fail";

interface ResponseMeta {
  page: number;
  size: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

interface ResponseErrorDetail {
  [key: string]: string;
}

interface ResponseError {
  code: string;
  message: string;
  details: ResponseErrorDetail;
}

// 코드
export interface Code {
  code: string;
  id: string;
  last_login_at: string;
  login_count: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  is_limit_reached: boolean;
  prompt_limit: number;
  prompt_count: number;
}

// 코드 상태
export enum CodeStatus {
  AVAILABLE = "available",
  UNAVAILABLE = "unavailable",
}

// 코드 리스트 조회 응답
export interface CodeListRes {
  status: StatusType;
  code: string;
  message: string;
  data: Code[] | null;
  meta: ResponseMeta | null;
  errors: ResponseError[] | null;
}

// 코드 생성 요청
export interface CodeCreateReq {
  name: string; // 학교명
  description: string; // 설명
  count: number; // 생성할 개수
  initials: string | null; // 영문 약자
  grade: string | null; // 학년
  class_number: string | null; // 반
  start_number: number; // 시작 번호
}

// 메시지
export interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
  created_at: string;
  updated_at: string;
}

// 대화
export interface Conversation {
  title: string;
  id: string;
  code_id: string;
  folder_id: string | null;
  created_at: string;
  updated_at: string;
  messages: Message[];
}

// 코드 상세
export interface CodeDetail {
  code: string;
  id: string;
  last_login_at: string;
  login_count: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  is_limit_reached: boolean;
  prompt_limit: number;
  prompt_count: number;
  conversations: Conversation[];
}

// 상세 조회 응답
export interface CodeDetailRes {
  status: StatusType;
  code: string;
  message: string;
  data: CodeDetail | null;
  meta: Record<string, unknown>;
  errors: ResponseError[] | null;
}

// 코드 수정 요청
export interface CodeUpdateReq {
  name: string;
  description: string;
  prompt_limit: number;
}
