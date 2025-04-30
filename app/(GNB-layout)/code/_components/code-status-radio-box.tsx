import FilterName from "@/app/shared/filter-name";
import { Dispatch, SetStateAction } from "react";

interface CodeStatusRadioBoxProps {
  chatStatus: boolean | "all";
  setChatStatus: Dispatch<SetStateAction<boolean | "all">>;
}

const CodeStatusRadioBox = ({ chatStatus, setChatStatus }: CodeStatusRadioBoxProps) => {
  const OPTIONS = [
    { label: "전체", value: "all" },
    { label: "가능", value: "false" },
    { label: "불가능", value: "true" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value; // 'all' | 'true' | 'false'
    setChatStatus(
      val === "all" ? "all" : val === "true" // 'true' → true, 'false' → false
    );
  };

  return (
    <div className="flex h-[72px] border-x border-b items-center">
      <FilterName name="채팅 상태" />
      <div className="ml-2 flex gap-8">
        {OPTIONS.map(({ label, value }) => (
          <label key={value} className="flex items-center gap-1 cursor-pointer text-sm">
            <input
              type="radio"
              name="chatStatus"
              value={value}
              checked={String(chatStatus) === value}
              onChange={handleChange}
              className="accent-primary"
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
};
export default CodeStatusRadioBox;
