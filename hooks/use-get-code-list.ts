"use client";
import { getCodeList } from "@/app/api/code";
import { CodeStatus } from "@/app/api/dto/code";
import useSWR from "swr";

export default function useGetCodeList(
  page: number = 1,
  limit: number = 10,
  keyword?: string,
  start_date?: string,
  end_date?: string,
  status: CodeStatus | null = null
) {
  const key = ["/codes", page, limit, keyword, start_date, end_date, status] as const;
  return useSWR(
    key,
    () =>
      getCodeList({
        page,
        limit,
        ...(keyword ? { keyword } : {}),
        ...(start_date ? { start_date } : {}),
        ...(end_date ? { end_date } : {}),
        status,
      }),
    {
      suspense: true,
      keepPreviousData: true,
    }
  ).data;
}
