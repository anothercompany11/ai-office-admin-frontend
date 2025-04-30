import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface CodeDetailContainerProps {
  name: string;
  code: string;
  created_at: string;
  prompt_count: number;
  prompt_limit: number;
  is_limit_reached: boolean;
  description: string;
}

export default function CodeDetailContainer({
  name,
  code,
  created_at,
  prompt_count,
  prompt_limit,
  is_limit_reached,
  description,
}: CodeDetailContainerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState(description);

  const handleCancel = () => {
    setMemo(description);
    setIsEditing(false);
  };

  const handleSave = () => {
    // TODO: 저장 핸들러
    setIsEditing(false);
  };

  const handleDelete = () => {
    // TODO: 삭제 핸들러
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl w-full font-semibold">상세정보</h2>
        <div className="flex ml-auto w-full gap-2">
          <Button size={"sm"} onClick={handleDelete}>삭제하기</Button>
          {isEditing ? (
            <>
              <Button size={"sm"} onClick={handleCancel}>취소</Button>
              <Button size={"sm"} onClick={handleSave}>저장</Button>
            </>
          ) : (
            <Button size={"sm"} onClick={() => setIsEditing(true)}>수정하기</Button>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">학교 이름</p>
          <p className="mt-1">{name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">생성 코드</p>
          <p className="mt-1 font-mono">{code}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">생성 일자</p>
          <p className="mt-1">{created_at}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">이용 가능 횟수</p>
          <p className="mt-1">{prompt_count} / {prompt_limit}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">채팅 상태</p>
          <p className="mt-1">{is_limit_reached ? '불가능' : '가능'}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-gray-500">관리자 메모</p>
          {isEditing ? (
            <Input
              className="mt-1 w-full"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          ) : (
            <p className="mt-1 whitespace-pre-wrap">{memo}</p>
          )}
        </div>
      </div>
    </div>
  );
}
