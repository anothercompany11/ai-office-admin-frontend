"use client";
import useGetCodeDetail from "@/hooks/use-get-code-detail";
import { useParams } from "next/navigation";
import CodeDetailContainer from "./_components/code-detail-container";
import ConversationSection from "./_components/conversation-section";

const CodeDetailPage = () => {
  const params = useParams();
  const codeId = Array.isArray(params.id) ? params.id[0] : params.id;

  const { detail } = useGetCodeDetail(codeId);

  if (!detail) return <p>데이터가 없습니다.</p>;

  return (
    <div className="flex flex-col gap-10">
      <CodeDetailContainer {...detail} />
      <ConversationSection conversations={detail.conversations} />
    </div>
  );
};

export default CodeDetailPage;
