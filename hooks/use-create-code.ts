import { generateCodes } from "@/app/api/code";
import { CodeCreateSchema } from "@/schema/code";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

export default function useGenerateCodes(skip: number, limit: number) {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | unknown | null>(null);

  const generate = async (body: CodeCreateSchema, onSuccess: () => void) => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = {
        name: body.name,
        description: body.description ?? "",
        prompt_limit: 5, // 고정값
        count: body.mode === "batch" ? Number(body.count!) : 1,
      };
      await generateCodes(payload);
      await mutate(["/codes", skip, limit]);

      await new Promise((resolve) => setTimeout(resolve, 400));
      onSuccess();
      toast("코드 생성 성공");
    } catch (err: unknown) {
      setError(err);
      toast("코드 생성 실패", { description: "잠시 후 다시 시도해주세요" });
    } finally {
      setIsLoading(false);
    }
  };

  return { generate, isLoading, error };
}
