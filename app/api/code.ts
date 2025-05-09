import { apiFetch } from "@/util/fetch";
import { CodeCreateReq, CodeDetailRes, CodeListRes, CodeStatus, CodeUpdateReq } from "./dto/code";

// 코드 리스트 조회
export const getCodeList = (
  params: {
    page?: number;
    limit?: number;
    keyword?: string;
    start_date?: string;
    end_date?: string;
    status?: CodeStatus | null;
  } = {}
) => {
  const { page = 1, limit = 10, keyword, start_date, end_date, status = null } = params;

  const query: Record<string, string> = {
    page: String(page),
    limit: String(limit),
  };

  if (keyword) {
    query.keyword = keyword;
  }
  if (start_date) {
    query.start_date = start_date;
  }
  if (end_date) {
    query.end_date = end_date;
  }
  if (status !== null) {
    query.status = status;
  }

  const qs = new URLSearchParams(query);
  return apiFetch(`/codes?${qs.toString()}`) as Promise<CodeListRes>;
};

// 코드 생성
export const generateCodes = (data: CodeCreateReq) =>
  apiFetch("/codes/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// 코드 삭제
export const deleteCodes = (code_ids: string[]) =>
  apiFetch("/codes", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code_ids }),
  });

// 코드 연장 (prompt_limit 고정 5)
export const extendCodes = (code_ids: string[]) =>
  apiFetch("/codes/increase-usage-limit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code_ids, prompt_limit: 5 }),
  });

// 코드 상세 조회
export const getCodeDetail = (codeId: string) => apiFetch(`/codes/${codeId}`) as Promise<CodeDetailRes>;

// 코드 수정
export const updateCode = (code_id: string, data: CodeUpdateReq) =>
  apiFetch(`/codes/${code_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<CodeDetailRes>;
