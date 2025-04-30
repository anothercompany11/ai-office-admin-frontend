"use client";
import { getCodeDetail } from "@/app/api/code";
import { CodeDetailRes } from "@/app/api/dto/code";
import useSWR from "swr";

export default function useGetCodeDetail(codeId?: string) {
  const shouldFetch = !!codeId;
  const { data, error, isLoading, mutate } = useSWR<CodeDetailRes>(shouldFetch ? ["/codes", codeId] : null, () =>
    getCodeDetail(codeId!)
  );

  return {
    detail: data?.data ?? null,
    error,
    isLoading,
    refresh: () => mutate(),
  };
}
