import { LoaderIcon } from "lucide-react";
import { AdminRole } from "../api/dto/auth";

interface AdminInfoBoxProps {
  name: string;
  role: AdminRole;
}

const AdminInfoBox = ({ admin }: { admin: AdminInfoBoxProps }) => {
  return (
    <div className="h-[53px] px-3">
      {admin ? (
        <div className="flex justify-between">
          <p>
            <span className="heading-4">{admin.name}</span>
            <span className="body-1">님 안녕하세요</span>
          </p>
          <p className="rounded-sm bg-white px-2 py-[2px] text-black subtitle-3">
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
