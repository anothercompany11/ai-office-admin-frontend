import { generateCodes } from "@/app/api/code";
import { CodeCreateSchema } from "@/schema/code";
import { useState } from "react";
import { useSWRConfig } from "swr";

export default function useGenerateCodes(skip: number, limit: number) {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | unknown | null>(null);

  const generate = async (body: CodeCreateSchema) => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = {
        name: body.name,
        description: body.description ?? "",
        prompt_limit: 5, // 고정값
        count: body.mode === "batch" ? body.count! : 1,
      };
      await generateCodes(payload);

      await mutate(["/codes", skip, limit]);
    } catch (err: unknown) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { generate, isLoading, error };
}
