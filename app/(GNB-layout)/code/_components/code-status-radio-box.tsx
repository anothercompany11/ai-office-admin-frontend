import { CodeStatus } from "@/app/api/code";
import FilterName from "@/app/shared/filter-name";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dispatch, SetStateAction } from "react";

interface CodeStatusRadioBoxProps {
  status: CodeStatus | null;
  setStatus: Dispatch<SetStateAction<CodeStatus | null>>;
}

export default function CodeStatusRadioBox({ status, setStatus }: CodeStatusRadioBoxProps) {
  return (
    <div className="flex h-[72px] border-x border-b gap-6 items-center">
      <FilterName name="채팅 상태" />
      <RadioGroup
        className="flex gap-8"
        value={status ?? "all"}
        onValueChange={(val) => {
          if (val === "all") setStatus(null);
          else setStatus(val as CodeStatus);
        }}
      >
        <label className="flex items-center gap-1 cursor-pointer">
          <RadioGroupItem value="all" />
          <span className="text-subtitle-m">전체</span>
        </label>
        <label className="flex items-center gap-1 cursor-pointer">
          <RadioGroupItem value={CodeStatus.AVAILABLE} />
          <span className="text-subtitle-m">가능</span>
        </label>
        <label className="flex items-center gap-1 cursor-pointer">
          <RadioGroupItem value={CodeStatus.UNAVAILABLE} />
          <span className="text-subtitle-m">불가능</span>
        </label>
      </RadioGroup>
    </div>
  );
}
