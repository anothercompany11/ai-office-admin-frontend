"use client";
import { Code } from "@/app/api/dto/code";
import CodeCreateModal from "./code-create-modal";


interface CTAButtonBoxProps {
  selectedIds: Array<Code["id"]>;
  skip: number;
  limit: number;
}

export default function CTAButtonBox({ selectedIds, skip, limit }: CTAButtonBoxProps) {
  return (
    <div className="flex gap-2">
      <button className="btn-primary" onClick={() => console.log("삭제:", selectedIds)}>
        삭제하기
      </button>
      <button className="btn-outline" onClick={() => console.log("연장:", selectedIds)}>
        연장하기
      </button>
      <CodeCreateModal skip={skip} limit={limit} />
    </div>
  );
}
