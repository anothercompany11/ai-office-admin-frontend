import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import FilterName from "./filter-name";

interface SearchBarProps {
  placeholder: string;
  setKeyword: (val: string) => void;
}

const SearchBar = ({ placeholder, setKeyword }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");

  // 인풋 변경 핸들러
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setKeyword(inputValue); // 검색어 전달
    }
  };

  return (
    <div className="flex h-[72px] border">
      <FilterName name="상세검색" />
      <div className="relative flex w-[350px] items-center pl-6">
        <Input
          className="h-[48px]"
          placeholder={placeholder}
          value={inputValue}
          onChange={onChangeValue} // 입력값 업데이트
          onKeyDown={handleKeyDown} // Enter 키 감지
        />
        <SearchIcon className="absolute inset-y-0 right-0 my-auto mr-4 size-[18px] text-label" />
      </div>
    </div>
  );
};

export default SearchBar;
