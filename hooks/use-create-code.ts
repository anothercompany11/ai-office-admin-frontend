import { generateCodes } from "@/app/api/code";
import { useState } from "react";
import { useSWRConfig } from "swr";

export default function useGenerateCodes(skip: number, limit: number) {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generate = async (body: { name: string; description: string; prompt_limit: number; count: number }) => {
    setIsLoading(true);
    setError(null);
    try {
      await generateCodes(body);
      await mutate(["/codes", skip, limit]);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { generate, isLoading, error };
}
