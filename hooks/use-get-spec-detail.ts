"use client";
import { getSpecDetail } from "@/app/api/spec";
import { SpecDetailRes } from "@/app/api/dto/spec";
import useSWR from "swr";

// 명세 상세 조회 (본문 + 버전 목록)
export default function useGetSpecDetail(specId?: string) {
  const { data, error, isLoading } = useSWR<SpecDetailRes>(specId ? ["/specs", specId] : null, () =>
    getSpecDetail(specId!)
  );

  return {
    detail: data?.data ?? null,
    error,
    isLoading,
  };
}
