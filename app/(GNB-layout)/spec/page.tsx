"use client";

import PageCrumble from "@/app/shared/page-crumble";
import dynamic from "next/dynamic";

const SpecListContainer = dynamic(() => import("./_components/spec-list-container"), { ssr: false });

const SpecListPage = () => {
  return (
    <div className="flex flex-col gap-10 p-10">
      <PageCrumble props={{ icon: "file-text", type: "original", path: "명세 관리" }} />
      <SpecListContainer />
    </div>
  );
};

export default SpecListPage;
