"use client";
import { getCodeList } from "@/app/api/code";
import useSWR from "swr";

export default function useGetCodeList(skip = 0, limit = 10) {
  return useSWR(
    [`/codes`, skip, limit], // key
    () => getCodeList({ skip, limit }) // fetcher
  ).data;
}
