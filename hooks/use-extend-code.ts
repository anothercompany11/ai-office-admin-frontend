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
      await mutate(["/codes", skip, limit]);
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
