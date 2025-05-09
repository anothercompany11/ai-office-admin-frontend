import { CodeStatus } from "@/app/api/dto/code";
import DurationBox from "@/app/shared/duration-box";
import SearchBar from "@/app/shared/search-bar";
import { Dispatch, SetStateAction } from "react";
import CodeStatusRadioBox from "./code-status-radio-box";

interface CodeFilterAndSearchBoxProps {
  // 키워드
  setKeyword: (k: string) => void;
  // 날짜
  startDate: Date;
  endDate: Date;
  setDateRange: (s: Date | undefined, e: Date | undefined) => void;
  setCurrentPage: (p: number) => void;
  // 코드 상태
  status: CodeStatus | null;
  setStatus: Dispatch<SetStateAction<CodeStatus | null>>;
}

const CodeFilterAndSearchBox = ({
  setKeyword,
  startDate,
  endDate,
  setDateRange,
  setCurrentPage,
  status,
  setStatus,
}: CodeFilterAndSearchBoxProps) => {
  // 초기화 버튼 핸들러
  const handleReset = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    setKeyword("");
    setDateRange(yesterday, today);
    setCurrentPage(1);
    setStatus(null);
  };
  return (
    <div className="w-full min-w-[900px]">
      <SearchBar
        placeholder="코드, 학교 이름, 메모 검색"
        setKeyword={(k) => {
          setKeyword(k);
          setCurrentPage(1);
        }}
        onReset={handleReset}
      />
      <DurationBox
        range={{ from: startDate, to: endDate }}
        handleFilterChange={(s, e) => {
          setDateRange(s, e);
          setCurrentPage(1);
        }}
      />
      <CodeStatusRadioBox status={status} setStatus={setStatus} />
    </div>
  );
};

export default CodeFilterAndSearchBox;
