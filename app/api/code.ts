import { apiFetch } from "@/util/fetch";
import { CodeCreateReq, CodeDetailRes, CodeListRes, CodeUpdateReq } from "./dto/code";

// 코드 리스트 조회
export const getCodeList = (params: { skip?: number; limit?: number } = {}) =>
  apiFetch(
    `/codes?${new URLSearchParams({
      skip: String(params.skip ?? 0),
      limit: String(params.limit ?? 10),
    })}`
  ) as Promise<CodeListRes>;

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
