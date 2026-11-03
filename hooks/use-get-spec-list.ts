"use client";
import { getSpecList } from "@/app/api/spec";
import useSWR from "swr";

// 명세 목록 조회 (대화당 최신 버전 한 줄)
export default function useGetSpecList(page: number = 1, limit: number = 20, keyword?: string, codeId?: string) {
  const key = ["/specs", page, limit, keyword, codeId] as const;
  return useSWR(
    key,
    () =>
      getSpecList({
        page,
        limit,
        ...(keyword ? { keyword } : {}),
        ...(codeId ? { code_id: codeId } : {}),
      }),
    {
      suspense: true,
      keepPreviousData: true,
    }
  ).data;
}
