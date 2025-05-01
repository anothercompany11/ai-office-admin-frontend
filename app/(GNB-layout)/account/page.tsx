export const dynamic = "force-dynamic";
import Loading from "@/app/shared/loading";
import PageCrumble from "@/app/shared/page-crumble";
import AdminUserTable from "./_components/account-table";

export default function AccountPage() {
  return (
    <div className="p-6">
      <PageCrumble props={{ icon: "user", type: "original", path: "관리자 계정 관리" }} />
      <Loading>
        <AdminUserTable />
      </Loading>
    </div>
  );
}
