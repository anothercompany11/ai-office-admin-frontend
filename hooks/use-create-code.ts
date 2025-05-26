import { generateCodes } from "@/app/api/code";
import { CodeCreateReq } from "@/app/api/dto/code";
import { CodeCreateSchema } from "@/schema/code";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

// 코드 생성 훅
export default function useGenerateCodes(skip: number, limit: number) {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | unknown | null>(null);

  const generate = async (body: CodeCreateSchema, onSuccess: () => void) => {
    setIsLoading(true);
    setError(null);
    try {
      const payload: CodeCreateReq = {
        name: body.name,
        description: body.description ?? "",
        initials: body.initials ?? null,
        grade: body.grade ?? null,
        class_number: body.class_number ?? null,
        start_number: Number(body.start_number) ?? 1,
        count: body.mode === "batch" ? Number(body.count!) : 1,
      };
      await generateCodes(payload);

      // 모든 가능한 키 조합에 대해 mutate 호출
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

      await new Promise((resolve) => setTimeout(resolve, 400));
      onSuccess();
      toast("코드 생성 성공");
    } catch (err: unknown) {
      const errorObj = JSON.parse((err as Error).message);
      setError(err);
      toast("코드 생성 실패", { description: errorObj.message || "잠시 후 다시 시도해주세요" });
    } finally {
      setIsLoading(false);
    }
  };

  return { generate, isLoading, error };
}
