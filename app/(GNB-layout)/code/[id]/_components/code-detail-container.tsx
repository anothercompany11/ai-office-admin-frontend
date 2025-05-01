"use client";

import TwoButtonModal from "@/app/shared/two-button-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CODE_PAGE } from "@/constants/path";
import useUpdateCode from "@/hooks/use-code-update";
import useDeleteCodes from "@/hooks/use-delete-code";
import formattedDate from "@/util/date";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CodeDetailContainerProps {
  name: string;
  code: string;
  id: string;
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
  id,
}: CodeDetailContainerProps) {
  const router = useRouter();
  const onSuccessDelete = () => router.replace(CODE_PAGE);
  const { remove, isDeleting } = useDeleteCodes(0, 0, onSuccessDelete);
  const onSuccessUpdate = () => setIsEditing(false);
  const { update, isUpdating } = useUpdateCode(onSuccessUpdate);

  // 편집 상태
  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState(description);

  // 삭제 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancelEdit = () => {
    setMemo(description);
    setIsEditing(false);
  };

  const handleSave = async () => {
    await update(id, {
      name,
      description: memo,
      prompt_limit: prompt_limit,
    });
  };

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    await remove([id]);
  };

  return (
    <div className="bg-white border border-line rounded-lg w-full p-6">
      {/* Header */}
      <div className="flex overflow-hidden">
        <h2 className="text-title-l mr-auto">상세정보</h2>
        <div className="flex gap-2 max-w-max">
          {isEditing ? (
            <>
              <Button size="md" variant="outline" onClick={handleCancelEdit}>
                취소하기
              </Button>
              <Button disabled={isUpdating} size="md" variant="outline" onClick={handleSave}>
                저장하기
              </Button>
            </>
          ) : (
            <>
              <Button size="md" variant="destructive" onClick={openDeleteModal}>
                삭제하기
              </Button>
              <Button variant="outline" size="md" onClick={() => setIsEditing(true)}>
                수정하기
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-6">
        <div className="flex gap-3 items-center">
          <p className="text-subtitle-m w-[120px]">학교 이름</p>
          <p className="text-body-2 text-gray-800">{name}</p>
        </div>
        <div className="flex gap-3 items-center">
          <p className="text-subtitle-m w-[120px]">생성 코드</p>
          <p className="text-body-2 text-gray-800">{code}</p>
        </div>
        <div className="flex gap-3 items-center">
          <p className="text-subtitle-m w-[120px]">생성 일자</p>
          <p className="text-body-2 text-gray-800">{formattedDate(created_at)}</p>
        </div>
        <div className="flex gap-3 items-center">
          <p className="text-subtitle-m w-[120px]">이용 가능 횟수</p>
          <p className="text-body-2 text-gray-800">
            {prompt_count} / {prompt_limit}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <p className="text-subtitle-m w-[120px]">채팅 상태</p>
          <p className="text-body-2 text-gray-800">{is_limit_reached ? "불가능" : "가능"}</p>
        </div>
        <div className="flex gap-3">
          <p className="text-subtitle-m w-[120px]">관리자 메모</p>
          {isEditing ? (
            <Input className="w-full" value={memo} onChange={(e) => setMemo(e.target.value)} />
          ) : (
            <p className="text-body-2 text-gray-800">{memo}</p>
          )}
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {isModalOpen && (
        <TwoButtonModal
          title="코드를 삭제하시나요?"
          desc={`코드 삭제 시 해당 사용자의 채팅 내역이\n영구적으로 삭제됩니다.`}
          loading={isDeleting}
          buttonText="삭제"
          onClickFirstBtn={closeDeleteModal}
          onClickSecondBtn={handleConfirmDelete}
        />
      )}
    </div>
  );
}
