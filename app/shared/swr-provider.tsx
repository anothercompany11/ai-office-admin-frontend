"use client";

import { apiFetch } from "@/util/fetch";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => apiFetch(url),
        suspense: true,
      }}
    >
      {children}
    </SWRConfig>
  );
}
