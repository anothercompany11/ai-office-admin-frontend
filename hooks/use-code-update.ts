import { updateCode } from "@/app/api/code";
import { CodeUpdateReq } from "@/app/api/dto/code";
import { useState } from "react";
import { useSWRConfig } from "swr";

export default function useUpdateCode(onSuccess?: () => void) {
  const { mutate } = useSWRConfig();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = async (codeId: string, data: CodeUpdateReq) => {
    setIsUpdating(true);
    setError(null);
    try {
      const res = await updateCode(codeId, data);
      // 상세 리패치
      await mutate(`/codes/${codeId}`);
      onSuccess?.();
      return res;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  return { update, isUpdating, error };
}
