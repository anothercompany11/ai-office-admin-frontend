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
  skip: number;
  limit: number;
}

const CTAButtonBox = ({ selectedIds, skip, limit }: CTAButtonBoxProps) => {
  const { remove, isDeleting } = useDeleteCodes(skip, limit);
  const { extend, isExtending } = useExtendCodes(skip, limit);

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
          title="선택한 코드를 삭제하시겠습니까?"
          desc={`${selectedIds.length.toLocaleString()}개 삭제`}
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
          title="사용 가능 횟수를 연장하시겠습니까?"
          desc={`${selectedIds.length.toLocaleString()}개 연장 (limit=5)`}
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
