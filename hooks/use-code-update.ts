import { updateCode } from "@/app/api/code";
import { CodeUpdateReq } from "@/app/api/dto/code";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

export default function useUpdateCode(onSuccess: () => void) {
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
      onSuccess();
      toast("메모 수정 성공", {
        description: "메모가 수정되었어요",
      });
      return res;
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      setError(err);
      console.error(err);
      toast("메모 수정 실패", {
        description: "잠시 후 다시 시도해주세요",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return { update, isUpdating, error };
}
