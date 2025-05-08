"use client";
import { getCodeList } from "@/app/api/code";
import useSWR from "swr";

export default function useGetCodeList(page = 1, limit = 10) {
  return useSWR([`/codes`, page, limit], () => getCodeList({ page, limit })).data;
}
