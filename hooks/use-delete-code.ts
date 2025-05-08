import { deleteCodes } from "@/app/api/code";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

// 코드 삭제(비활성화) 요청
export default function useDeleteCodes(skip: number, limit: number, onSuccess?: () => void) {
  const { mutate } = useSWRConfig();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const remove = async (ids: string[]) => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteCodes(ids);
      await mutate(["/codes", skip, limit]);
      if (onSuccess) {
        onSuccess();
      }
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      setError(err);
      console.error(err);
      toast("코드 삭제 실패", {
        description: "잠시 후 다시 시도해주세요",
      });
    } finally {
      toast("코드 삭제 성공", {
        description: "코드가 삭제되었어요",
      });
      setIsDeleting(false);
    }
  };

  return { remove, isDeleting, error };
}
