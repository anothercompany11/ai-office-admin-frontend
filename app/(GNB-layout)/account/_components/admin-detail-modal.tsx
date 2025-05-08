import { AdminUser } from "@/app/api/dto/account";
import { AdminRole } from "@/app/api/dto/auth";
import TwoButtonBar from "@/app/shared/two-button-bar";
import TwoButtonModal from "@/app/shared/two-button-modal";
import useDeleteAdminAccount from "@/hooks/use-delete-account";
import useResetAdminPassword from "@/hooks/use-reset-password";
import formattedDate, { DateType } from "@/util/date";
import { AdminAccountStorage } from "@/util/storage";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";

type User = {
  name: string;
  login_id: string;
  created_at: string;
};

interface Props {
  user: User;
  targetAccount: AdminUser;
  handleCloseModal: () => void;
  page: number;
  size: number;
}

const AdminDetailModal = ({ user, handleCloseModal, page, size, targetAccount }: Props) => {
  const { deleteAccount, isDeleting } = useDeleteAdminAccount(page, size, handleCloseModal);
  const { resetPassword, isResetting } = useResetAdminPassword();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // 계정 삭제 확인 모달
 const adminInfo = AdminAccountStorage.getAdminInfo();
  const isSuperAdmin = adminInfo?.role == AdminRole.SUPER_ADMIN

  // 모달 상태에 따른 body 스크롤 조작
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const ADMIN_INFO_KEY_VALUE = [
    { title: "이름", value: user.name },
    { title: "아이디", value: user.login_id },
    { title: "등록일", value: formattedDate(user.created_at, DateType.SHORTENED_YEAR_DEFAULT_FULL) },
  ];

  const onDelete = async () => {
    await deleteAccount(targetAccount.id);
  };

  const onReset = async () => {
    await resetPassword(targetAccount.id);
  };

  const onOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden bg-black/70">
      <div className="w-[500px] rounded-[20px] bg-white p-6">
        <div className="flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <p className="text-title-l">관리자 상세보기</p>
            <button onClick={handleCloseModal}>
              <XIcon className="size-6 text-component" />
            </button>
          </div>
          <div className={`flex flex-col gap-3 ${isSuperAdmin ? "" : "mb-10"}`}>
            {ADMIN_INFO_KEY_VALUE.map((info) => (
              <AdminInfoRow {...info} key={info.title} />
            ))}
          </div>
          {isSuperAdmin && <TwoButtonBar
            firstBtnDisabled={isDeleting}
            disabled={isResetting}
            firstBtnTxt="관리자 삭제"
            secondBtnTxt="비밀번호 초기화"
            size="lg"
            onClickFirstBtn={onOpenDeleteModal}
            onClickSecondBtn={onReset}
          />}
          {deleteModalOpen && (
            <TwoButtonModal
              title="관리자를 삭제하시나요?"
              buttonText="삭제하기"
              onClickFirstBtn={() => setDeleteModalOpen(false)}
              onClickSecondBtn={onDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDetailModal;

const AdminInfoRow = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex gap-5 items-center">
      <span className="text-label-strong w-[50px] text-subtitle-l">{title}</span>
      <span className="text-body-m">{value ?? "관리자"}</span>
    </div>
  );
};
