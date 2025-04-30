import { apiFetch } from "@/util/fetch";
import { CodeCreateReq, CodeListRes } from "./dto/code";

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
