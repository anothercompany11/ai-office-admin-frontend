import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import FilterName from "./filter-name";

interface SearchBarProps {
  placeholder: string;
  setKeyword: (val: string) => void;
  onReset: () => void; // 전체 초기화 콜백
}

const SearchBar = ({ placeholder, setKeyword, onReset }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");

  /** 엔터 시 검색 실행 */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("인풋에서 변경하려는 값", inputValue.trim());
      setKeyword(inputValue.trim());
    }
  };

  /** “초기화” 버튼 */
  const handleReset = () => {
    setInputValue("");
    setKeyword("");
    onReset();
  };

  return (
    <div className="flex h-[72px] items-center gap-2 border px-4">
      <FilterName name="상세검색" />

      {/* 검색 인풋 */}
      <div className="relative flex w-[350px] items-center">
        <Input
          className="h-[48px] pr-10"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SearchIcon className="absolute right-3 size-[18px] text-label" />
      </div>

      {/* 초기화 버튼 */}
      <button
        type="button"
        onClick={handleReset}
        className="h-[40px] rounded border px-4 text-sm text-label hover:bg-gray-50"
      >
        초기화
      </button>
    </div>
  );
};

export default SearchBar;
