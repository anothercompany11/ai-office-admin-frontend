import { extendCodes } from "@/app/api/code";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

// 코드 연장 훅
export default function useExtendCodes(skip: number, limit: number, onSuccess: () => void) {
  const { mutate } = useSWRConfig();
  const [isExtending, setIsExtending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const extend = async (ids: string[]) => {
    setIsExtending(true);
    setError(null);
    try {
      await extendCodes(ids);

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

      onSuccess();
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      setError(err);
      toast("코드 연장 실패", {
        description: "잠시 후 다시 시도해주세요",
      });
    } finally {
      setIsExtending(false);
      toast("코드 연장 성공", {
        description: "코드가 연장 되었어요",
      });
    }
  };

  return { extend, isExtending, error };
}
