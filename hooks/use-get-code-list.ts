"use client";
import { getCodeList } from "@/app/api/code";
import useSWR from "swr";

export default function useGetCodeList(
  page: number = 1,
  limit: number = 10,
  keyword?: string,
  start_date?: string,
  end_date?: string
) {
  return useSWR([`/codes`, page, limit, keyword, start_date, end_date], () =>
    getCodeList({
      page,
      limit,
      ...(keyword ? { keyword } : {}),
      ...(start_date ? { start_date } : {}),
      ...(end_date ? { end_date } : {}),
    })
  ).data;
}
