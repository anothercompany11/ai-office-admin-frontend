import DurationBox from "@/app/shared/duration-box";
import SearchBar from "@/app/shared/search-bar";

interface CodeFilterAndSearchBoxProps {
  setKeyword: (k: string) => void;
  startDate: Date;
  endDate: Date;
  setDateRange: (s: Date | undefined, e: Date | undefined) => void;
  setCurrentPage: (p: number) => void;
}

const CodeFilterAndSearchBox = ({
  setKeyword,
  startDate,
  endDate,
  setDateRange,
  setCurrentPage,
}: CodeFilterAndSearchBoxProps) => {
  // 초기화 버튼 핸들러
  const handleReset = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    setKeyword("");
    setDateRange(yesterday, today);
    setCurrentPage(1);
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
      {/* <CodeStatusRadioBox chatStatus={chatStatus} setChatStatus={setChatStatus} /> */}
    </div>
  );
};

export default CodeFilterAndSearchBox;
