import { deleteCodes } from "@/app/api/code";
import { useState } from "react";
import { useSWRConfig } from "swr";

// 코드 삭제(비활성화) 요청
export default function useDeleteCodes(skip: number, limit: number) {
  const { mutate } = useSWRConfig();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const remove = async (ids: string[]) => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteCodes(ids);
      await mutate(["/codes", skip, limit]);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return { remove, isDeleting, error };
}
