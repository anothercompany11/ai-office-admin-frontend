"use client";

import { Code } from "@/app/api/dto/code";
import TwoButtonModal from "@/app/shared/two-button-modal";
import { Button } from "@/components/ui/button";
import useDeleteCodes from "@/hooks/use-delete-code";
import useExtendCodes from "@/hooks/use-extend-code";
import { useState } from "react";
import CodeCreateModal from "./code-create-modal";

interface CTAButtonBoxProps {
  selectedIds: Array<Code["id"]>;
  handleClearSelection: () => void; // 선택된 아이디 배열을 초기화하는 함수
  skip: number;
  limit: number;
}

const CTAButtonBox = ({ handleClearSelection, selectedIds, skip, limit }: CTAButtonBoxProps) => {
  const { remove, isDeleting } = useDeleteCodes(skip, limit, handleClearSelection);
  const { extend, isExtending } = useExtendCodes(skip, limit, handleClearSelection);

  const [showDelModal, setShowDelModal] = useState(false);
  const [showExtModal, setShowExtModal] = useState(false);

  const isEmpty = selectedIds.length === 0;
  return (
    <div className="flex gap-2">
      <Button variant={"outline-black"} disabled={isEmpty} onClick={() => setShowDelModal(true)}>
        삭제하기
      </Button>
      <Button variant={"outline-black"} disabled={isEmpty} onClick={() => setShowExtModal(true)}>
        연장하기
      </Button>

      {showDelModal && (
        <TwoButtonModal
          title="선택한 코드를 삭제할까요?"
          desc={`영구적으로 코드가 삭제됩니다.`}
          loading={isDeleting}
          buttonText="삭제"
          onClickFirstBtn={() => setShowDelModal(false)}
          onClickSecondBtn={async () => {
            await remove(selectedIds);
            setShowDelModal(false);
          }}
        />
      )}

      {showExtModal && (
        <TwoButtonModal
          title="채팅 횟수를 연장할까요?"
          desc={`1회 연장 시 5회가 추가됩니다.`}
          loading={isExtending}
          buttonText="연장"
          onClickFirstBtn={() => setShowExtModal(false)}
          onClickSecondBtn={async () => {
            await extend(selectedIds);
            setShowExtModal(false);
          }}
        />
      )}
      <CodeCreateModal skip={skip} limit={limit} />
    </div>
  );
};
export default CTAButtonBox;
