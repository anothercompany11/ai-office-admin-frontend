import { AdminInfo } from "@/util/storage";
import { AdminRole } from "../api/dto/auth";
import { LoadIcon } from "./loading";

const AdminInfoBox = ({ adminInfo }: { adminInfo: AdminInfo | null }) => {
  return (
    <div className="h-[53px] relative px-3">
      <div className="flex justify-between">
        {adminInfo ? (
          <>
            <p>
              <span className="text-title-l">{adminInfo.name || "관리자"}</span>
              <span>님</span>
            </p>
            <p className="rounded-sm bg-white px-2 py-[2px] text-black text-subtitle-s">
              {adminInfo.role === AdminRole.ADMIN ? "일반" : "마스터"}
            </p>
          </>
        ) : (
          <LoadIcon />
        )}
      </div>
    </div>
  );
};
export default AdminInfoBox;
