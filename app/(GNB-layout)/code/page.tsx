"use client";

import PageCrumble from "@/app/shared/page-crumble";
import dynamic from "next/dynamic";

const CodeListContainer = dynamic(() => import("./_components/code-list-container"), { ssr: false });

const CodeListPage = () => {
  return (
    <div className="flex flex-col gap-10 p-10">
      <PageCrumble props={{ icon: "link", type: "original", path: "코드 관리" }} />
      <CodeListContainer />
    </div>
  );
};

export default CodeListPage;
