import { resetAdminPassword } from "@/app/api/account";
import { useCallback, useState } from "react";
import { toast } from "sonner";

// 관리자 계정 비밀번호 초기화 훅
export default function useResetAdminPassword() {
  const [isResetting, setIsResetting] = useState(false);

  const resetPassword = useCallback(async (adminId: string) => {
    setIsResetting(true);
    try {
      await resetAdminPassword(adminId);
      toast("비밀번호 초기화 성공", { description: "비밀번호는 00000000 입니다" });
    } catch {
      toast("비밀번호 초기화 실패", { description: "잠시 후 다시 시도해주세요" });
    } finally {
      setIsResetting(false);
    }
  }, []);

  return { resetPassword, isResetting };
}
