import { Code } from "@/app/api/dto/code";
import DurationBox from "@/app/shared/duration-box";
import SearchBar from "@/app/shared/search-bar";
import { searchDate } from "@/components/ui/calendar-single";
import { useEffect, useState } from "react";
import CodeStatusRadioBox from "./code-status-radio-box";

interface CodeFilterAndSearchBoxProps {
  data: Code[]; // 전체 데이터
  setFilteredData: (data: Code[]) => void; // 필터링 된 데이터를 업데이트하는 함수
  setCurrentPage: (newPage: number) => void
}

const CodeFilterAndSearchBox = ({ data, setFilteredData, setCurrentPage }: CodeFilterAndSearchBoxProps) => {
  const [keyword, setKeyword] = useState("");
  const [chatStatus, setChatStatus] = useState<"all" | true | false>("all");
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  /* 1) 기본값을 어제·오늘로 세팅 */
  const [duration, setDuration] = useState<searchDate>({
    start: yesterday,
    end: today,
  });

  /** 기간 변경 콜백 */
  const handleDurationChange = (start?: Date, end?: Date) => {
    setDuration({ start, end });
  };


  const resetFilters = () => {
    setKeyword("");
    const endPlusOne = new Date(today);
    endPlusOne.setDate(endPlusOne.getDate() + 1);

    setDuration({ start: yesterday, end: endPlusOne });
    setChatStatus("all");
    setCurrentPage(1);
    setFilteredData(data);
  };

  const filterData = () => {
    setCurrentPage(1); // 페이지 초기화
    let filtered = data;

    /* 1) 검색어 */
    if (keyword) {
      const lower = keyword.toLowerCase();
      filtered = filtered.filter(
        (item) => item.code.toLowerCase().includes(lower) || item.name.toLowerCase().includes(lower)
      );
    }
    console.log("1", filtered);
    /* 2) 기간 */
    if (duration && duration.start && duration.end) {
      // duration.start/end 는 사용자가 고른 날짜의 00:00:00 이라 가정
      const start = new Date(duration.start);
      start.setHours(0, 0, 0, 0);

      const end = new Date(duration.end);
      // exclusive bound: “end of day” 포함하려면 1일 00:00:00
      end.setDate(end.getDate() + 1);
      end.setHours(0, 0, 0, 0);

      filtered = filtered.filter((item) => {
        const created = new Date(item.created_at);
        return created >= start && created < end;
      });
    }

    if (chatStatus !== "all") {
      filtered = filtered.filter((item) => item.is_limit_reached === chatStatus);
    }
    setFilteredData(filtered);
  };

  // 필터/검색 조건에 따라 필터링 함수 트리거
  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, duration, chatStatus]);

  return (
    <div className="w-full">
      <SearchBar placeholder="코드,학교 이름,관리자 메모 검색" setKeyword={setKeyword} onReset={resetFilters} />
      <DurationBox range={duration} handleFilterChange={handleDurationChange} />
      <CodeStatusRadioBox chatStatus={chatStatus} setChatStatus={setChatStatus} />
    </div>
  );
};

export default CodeFilterAndSearchBox;
