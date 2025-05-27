"use client";

import { useAuthStore } from "@/stores/auth-store";
import { CSRFTokenStorage } from "@/util/storage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { accessToken } = useAuthStore();

  useEffect(() => {
    const csrfToken = CSRFTokenStorage.getToken();

    if (accessToken && csrfToken) {
      router.replace("/code");
    } else {
      router.replace("/login");
    }
  }, [accessToken, router]);

  return null;
}
