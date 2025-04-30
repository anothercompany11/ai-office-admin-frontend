"use client";

import Loading from "@/app/shared/loading";
import PageCrumble from "@/app/shared/page-crumble";
import { ChevronRightIcon } from "lucide-react";

interface CodeDetailPageLayoutProps {
  children: React.ReactNode;
}

const CodeDetailPageLayout = ({ children }: CodeDetailPageLayoutProps) => {
  return (
    <>
      <div className="relative p-10 min-h-screen">
        <PageCrumble props={{ icon: "link", type: "original", path: "코드 관리" }} />
        <p className="text-body-m text-label-natural mt-3 mb-10 items-center flex gap-3">
          <span>코드 관리</span>
          <ChevronRightIcon size={18} />
          <span>상세보기</span>
        </p>
        <Loading>{children}</Loading>
      </div>
    </>
  );
};

export default CodeDetailPageLayout;
