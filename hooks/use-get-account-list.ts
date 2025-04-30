"use client";

import { getAdminAccountList } from "@/app/api/admin";
import { AdminUserListRes } from "@/app/api/dto/admin";
import useSWR from "swr";

export default function useGetAdminAccountList(page: number, size: number) {
  const key = ["/admin-users", page, size];
  const { data, error, isLoading, mutate } = useSWR<AdminUserListRes>(key, () => getAdminAccountList({ page, size }));
  return { data: data?.data || [], meta: data?.meta, isLoading, error, refresh: () => mutate() };
}
