import { extendCodes } from "@/app/api/code";
import { useState } from "react";
import { useSWRConfig } from "swr";

// 코드 연장 훅
export default function useExtendCodes(skip: number, limit: number) {
  const { mutate } = useSWRConfig();
  const [isExtending, setIsExtending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const extend = async (ids: string[]) => {
    setIsExtending(true);
    setError(null);
    try {
      await extendCodes(ids);
      await mutate(["/codes", skip, limit]);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsExtending(false);
    }
  };

  return { extend, isExtending, error };
}
