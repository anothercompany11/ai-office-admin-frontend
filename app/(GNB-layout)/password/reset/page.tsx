"use client";

import PasswordChangeModal from "@/app/shared/password-change-modal";
import { CODE_PAGE } from "@/constants/path";
import { useRouter } from "next/navigation";

const PasswordResetPage = () => {
  const router = useRouter();

  // 다음에 하기 버튼 핸들러
  const onClickClose = () => {
    router.push(CODE_PAGE);
  };
  return (
    <div>
      <PasswordChangeModal onClickClose={onClickClose} />
    </div>
  );
};
export default PasswordResetPage;
