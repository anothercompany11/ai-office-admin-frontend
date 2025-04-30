"use client";

import Loading from "@/app/shared/loading";
import PageCrumble from "@/app/shared/page-crumble";

interface CodeDetailPageLayoutProps {
  children: React.ReactNode;
}

const CodeDetailPageLayout = ({ children }: CodeDetailPageLayoutProps) => {
  return (
    <>
      <div className={`w-screen overflow-x-hidden`}>
        <div className="relative min-h-screen">
          <PageCrumble props={{ icon: "link", type: "original", path: "코드 관리" }} />
          <p className="text-body-m text-label-natural">{`코드 관리 > 상세보기`}</p>
          <Loading>{children}</Loading>
        </div>
      </div>

      {/* <Toaster /> */}
    </>
  );
};

export default CodeDetailPageLayout;
