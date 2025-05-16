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

      // 기본 키 (페이지, 리밋만 있는 경우)
      await mutate(["/codes", skip, limit]);

      // useGetCodeList에서 사용하는 전체 키 패턴에 대해 리페칭
      // 현재 표시 중인 모든 필터 조합에 대해 데이터 갱신
      await mutate((key) => {
        // key가 배열이고 첫 번째 요소가 "/codes"인 경우에만 리페칭
        if (Array.isArray(key) && key[0] === "/codes") {
          return true;
        }
        return false;
      });

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
