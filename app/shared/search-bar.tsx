import { Button } from "@/components/ui/button";
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

  // 엔터 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setKeyword(inputValue.trim());
    }
  };

  // 초기화 핸들러
  const handleReset = () => {
    setInputValue("");
    setKeyword("");
    onReset();
  };

  return (
    <div className="flex h-[72px] items-center gap-6 border">
      <FilterName name="상세검색" />

      <div className="flex gap-2 items-center">
        {/* 검색 인풋 */}
        <div className="relative flex w-[350px] items-center">
          <Input
            className="h-[48px] pr-10"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="absolute right-0 mr-3" onClick={() => setKeyword(inputValue.trim())}>
            <SearchIcon className="size-[18px] text-label" />
          </button>
        </div>

        {/* 초기화 버튼 */}
        <Button type="button" onClick={handleReset} variant={"outline-black"} className="max-w-[84px] w-full">
          초기화
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
