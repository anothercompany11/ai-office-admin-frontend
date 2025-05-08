"use client";

import Loading from "@/app/shared/loading";
import PageCrumble from "@/app/shared/page-crumble";
import dynamic from "next/dynamic";

// 이 컴포넌트는 SWR의 suspense 모드를 사용한 데이터 페칭을
// 순수 클라이언트에서만 수행하기 위해 dynamic import + ssr:false로 선언
const CodeListContainer = dynamic(() => import("./_components/code-list-container"), { ssr: false });

const CodeListPage = () => {
  return (
    <div className="flex flex-col gap-10 p-10">
      <PageCrumble props={{ icon: "link", type: "original", path: "코드 관리" }} />
      <Loading>
        <CodeListContainer />
      </Loading>
    </div>
  );
};

export default CodeListPage;
