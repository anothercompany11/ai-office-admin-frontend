import { apiFetch } from "@/util/fetch";
import { SpecDetailRes, SpecListRes } from "./dto/spec";

// 명세 목록 조회 (대화당 최신 버전 한 줄)
export const getSpecList = (
  params: { page?: number; limit?: number; keyword?: string; code_id?: string } = {}
) => {
  const { page = 1, limit = 20, keyword, code_id } = params;

  const query: Record<string, string> = {
    page: String(page),
    limit: String(limit),
  };
  if (keyword) query.keyword = keyword;
  if (code_id) query.code_id = code_id;

  const qs = new URLSearchParams(query);
  return apiFetch(`/specs?${qs.toString()}`) as Promise<SpecListRes>;
};

// 명세 상세 조회 (본문 + 버전 목록)
export const getSpecDetail = (specId: string) => apiFetch(`/specs/${specId}`) as Promise<SpecDetailRes>;

// 명세 파일 내려받기
// 인증 헤더가 필요해 링크로 바로 열 수 없으므로 blob 으로 받아 임시 링크를 만든다.
export const downloadSpec = async (specId: string, filename: string) => {
  const blob = (await apiFetch(`/specs/${specId}/download`, {}, "blob")) as Blob;
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};
