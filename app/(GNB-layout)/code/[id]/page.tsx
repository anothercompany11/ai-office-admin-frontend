"use client";
import useGetCodeDetail from "@/hooks/use-get-code-detail";
import { useParams } from "next/navigation";
import CodeDetailContainer from "./_components/code-detail-container";
import ConversationSection from "./_components/conversation-section";

const CodeDetailPage = () => {
  const params = useParams();
  const codeId = Array.isArray(params.id) ? params.id[0] : params.id;

  const { detail, isLoading, error, refresh } = useGetCodeDetail(codeId);

  if (isLoading) return <p>로딩 중…</p>;
  if (error) return <p>에러: {error.message}</p>;
  if (!detail) return <p>데이터가 없습니다.</p>;

  return (
    <div className="flex flex-col gap-10">
      <CodeDetailContainer {...detail} />
      <ConversationSection conversations={detail.conversations} />
    </div>
  );
};

export default CodeDetailPage;
