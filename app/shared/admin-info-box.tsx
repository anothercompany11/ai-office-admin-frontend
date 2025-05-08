import { LoaderIcon } from "lucide-react";
import { AdminRole } from "../api/dto/auth";

interface AdminInfoBoxProps {
  name: string | undefined;
  role: string | undefined;
}

const AdminInfoBox = ({ admin }: { admin: AdminInfoBoxProps }) => {
  return (
    <div className="h-[53px] px-3">
      {admin ? (
        <div className="flex justify-between">
          <p>
            <span className="text-title-l">{admin.name || "관리자"}</span>
            <span>님</span>
          </p>
          <p className="rounded-sm bg-white px-2 py-[2px] text-black text-subtitle-s">
            {admin.role === AdminRole.ADMIN ? "일반" : "마스터"}
          </p>
        </div>
      ) : (
        <LoaderIcon className={`animate-spin text-white duration-1000`} />
      )}
    </div>
  );
};
export default AdminInfoBox;
