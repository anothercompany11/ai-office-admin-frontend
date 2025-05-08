"use client";
import Loading from "@/app/shared/loading";
import PageCrumble from "@/app/shared/page-crumble";
import dynamic from "next/dynamic";

const AdminUserTable = dynamic(() => import("./_components/account-table"), { ssr: false });
export default function AccountPage() {
  return (
    <div className="flex flex-col gap-10 p-10">
      <PageCrumble props={{ icon: "user", type: "original", path: "관리자 계정 관리" }} />
      <Loading>
        <AdminUserTable />
      </Loading>
    </div>
  );
}
