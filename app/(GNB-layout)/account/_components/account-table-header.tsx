import { AdminRole } from "@/app/api/dto/auth";
import { SelectBox } from "@/app/shared/select-box";
import TableSummaryText from "@/app/shared/table-summary-text";
import { Button } from "@/components/ui/button";
import { AdminAccountStorage } from "@/util/storage";
import { useState } from "react";
import AdminCreateModal from "./admin-create-modal";

interface AccountTableHeaderProps {
  size: number;
  page: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  currentDataLen: number;
  totalDataLen: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const AccountTableHeader = ({
  size,
  page,
  setSize,
  setPage,
  currentDataLen,
  totalDataLen,
}: AccountTableHeaderProps) => {
  const [isCreateOpen, setCreateOpen] = useState(false); // 계정 생성 모달
  const adminInfo = AdminAccountStorage.getAdminInfo();
  const isSuperAdmin = adminInfo?.role == AdminRole.SUPER_ADMIN;
  console.log(isSuperAdmin, adminInfo);
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <TableSummaryText currentDataLen={currentDataLen} totalDataLen={totalDataLen} />
        <SelectBox
          value={String(size)}
          onChange={(e) => {
            setSize(Number(e));
            setPage(1);
          }}
          options={[10, 20, 30, 40].map((n) => ({ label: `${n}개씩 보기`, value: String(n) }))}
        />
      </div>
      {isSuperAdmin && (
        <Button className="w-[97px]" onClick={() => setCreateOpen(true)}>
          생성하기
        </Button>
      )}
      {isCreateOpen && <AdminCreateModal open={isCreateOpen} onOpenChange={setCreateOpen} page={page} size={size} />}
    </div>
  );
};

export default AccountTableHeader;
