import FilterName from "@/app/shared/filter-name";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dispatch, SetStateAction } from "react";

interface CodeStatusRadioBoxProps {
  chatStatus: boolean | "all";
  setChatStatus: Dispatch<SetStateAction<boolean | "all">>;
}

export default function CodeStatusRadioBox({ chatStatus, setChatStatus }: CodeStatusRadioBoxProps) {
  return (
    <div className="flex h-[72px] border-x border-b gap-6 items-center">
      <FilterName name="채팅 상태" />
      <RadioGroup
        className="flex gap-8"
        value={String(chatStatus)}
        onValueChange={(val) => setChatStatus(val === "all" ? "all" : val === "true")}
      >
        <label className="flex items-center gap-1">
          <RadioGroupItem value="all" />
          <span className="text-subtitle-m">전체</span>
        </label>
        <label className="flex items-center gap-1">
          <RadioGroupItem value="false" />
          <span className="text-subtitle-m">가능</span>
        </label>
        <label className="flex items-center gap-1">
          <RadioGroupItem value="true" />
          <span className="text-subtitle-m">불가능</span>
        </label>
      </RadioGroup>
    </div>
  );
}
