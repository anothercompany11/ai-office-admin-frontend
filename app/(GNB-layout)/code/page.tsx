export const dynamic = "force-dynamic";
import Loading from "@/app/shared/loading";
import PageCrumble from "@/app/shared/page-crumble";
import CodeListContainer from "./_components/code-list-container";

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
