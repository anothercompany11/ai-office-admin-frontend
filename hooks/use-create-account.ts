import { createAdminAccount } from "@/app/api/account";
import { AccountCreateSchema } from "@/schema/account";
import { useCallback, useState } from "react";
import { useSWRConfig } from "swr";

// 관리자 계정 생성 훅
export default function useCreateAdminAccount(page: number, size: number) {
  const [isCreating, setIsCreating] = useState(false);
  const { mutate } = useSWRConfig();
  const key = ["/admin-users", page, size] as const;

  const createAccount = useCallback(
    async (body: AccountCreateSchema) => {
      setIsCreating(true);
      try {
        await createAdminAccount(body);
        await mutate(key);
      } finally {
        setIsCreating(false);
      }
    },
    [mutate, key]
  );

  return { createAccount, isCreating };
}
