import { deleteAdminAccount } from "@/app/api/account";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

export default function useDeleteAdminAccount(page: number, size: number, onSuccess: () => void) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate } = useSWRConfig();
  const key = ["/admin-users", page, size] as const;

  const deleteAccount = useCallback(
    async (adminId: string) => {
      setIsDeleting(true);
      try {
        await deleteAdminAccount(adminId);
        // 삭제 성공 후 바로 해당 키를 리페칭
        await mutate(key);
        onSuccess();
        toast("계정 삭제 성공");
      } catch {
        toast("계정 삭제 실패", { description: "잠시 후 다시 시도해주세요" });
      } finally {
        setIsDeleting(false);
      }
    },
    [mutate, key]
  );

  return { deleteAccount, isDeleting };
}
