import { apiFetch } from "@/util/fetch";
import { CodeListRes } from "./dto/code";

export const getCodeList = (params: { skip?: number; limit?: number } = {}) =>
  apiFetch(
    `/codes?${new URLSearchParams({
      skip: String(params.skip ?? 0),
      limit: String(params.limit ?? 10),
    })}`
  ) as Promise<CodeListRes>;
