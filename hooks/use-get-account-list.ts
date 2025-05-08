"use client";

import { getAdminAccountList } from "@/app/api/account";
import { AdminUserListRes } from "@/app/api/dto/account";
import useSWR from "swr";

export default function useGetAdminAccountList(page: number, size: number) {
  const key = ["/admin-users", page, size];
  const { data, mutate } = useSWR<AdminUserListRes>(key, () => getAdminAccountList({ page, size }));
  return { data: data?.data || [], meta: data?.meta, refresh: () => mutate() };
}
