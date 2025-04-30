"use client";

import Loading from "@/app/shared/loading";
import PageCrumble from "@/app/shared/page-crumble";
import MemberContainer from "./_components/member-container";

const MemberPage = () => {
  return (
    <div className="flex flex-col gap-10 p-10">
      <PageCrumble props={{ icon: "link", type: "original", path: "코드 관리" }} />
      <Loading>
        <MemberContainer />
      </Loading>
    </div>
  );
};
export default MemberPage;
