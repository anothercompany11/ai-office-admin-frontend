import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FilterName from "./filter-name";

interface DropdownProps {
  noBottomBorder?: string; // 하단 보더 여부
  conditions: {
    value: string;
    label: string;
  }[];
  label?: string; // 라벨 이름
  dropdownClass?: string; // 추가 CSS 클래스
  handleChangeValue: (data: string) => void; // 값 변경 핸들러
}

const Dropdown = ({ noBottomBorder, dropdownClass, label, conditions, handleChangeValue }: DropdownProps) => {
  return (
    <div className={`flex h-[72px] ${noBottomBorder ? "border-x" : "border-x border-b"} ${dropdownClass}`}>
      {label && <FilterName name={label} />}
      <div className="flex pl-6">
        <Select onValueChange={handleChangeValue}>
          <SelectTrigger className="my-auto h-[48px] w-[143px]">
            <SelectValue placeholder="유형 선택" />
          </SelectTrigger>
          <SelectContent>
            {conditions.map((condition) => (
              <SelectItem key={condition.value} value={condition.value}>
                {condition.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Dropdown;
