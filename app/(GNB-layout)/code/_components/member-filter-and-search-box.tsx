import DurationBox from "@/app/shared/duration-box";
import SearchBar from "@/app/shared/search-bar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MemberRes } from "./filter-and-table-container";
interface MemberFilterAndSearchBoxProps {
  data: MemberRes[]; // 전체 데이터
  setFilteredData: (data: MemberRes[]) => void; // 필터링 된 데이터를 업데이트하는 함수
  setLoading: (loading: boolean) => void; // 기간 필터링이 적용 되었는지에 따라 로딩 상태 업데이트 하는 함수
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const MemberFilterAndSearchBox = ({
  data,
  setFilteredData,
  setLoading,
  setCurrentPage,
}: MemberFilterAndSearchBoxProps) => {
  const [keyword, setKeyword] = useState(""); // 검색어
  const [duration, setDuration] = useState<{ start?: Date; end?: Date } | string>({}); // 선택된 기간
  const handleDurationChange = (start?: Date, end?: Date) => {
    setDuration({ start, end });
  };

  const filterData = () => {
    setCurrentPage(1); // 페이지 초기화
    if (typeof duration !== "string" && (duration.start === undefined || duration.end === undefined)) {
      return;
    }
    let filtered = data;

    // 검색어 필터링
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      filtered = filtered.filter(
        (item) => item.email.toLowerCase().includes(lowerKeyword) || item.userNo.toLowerCase().includes(lowerKeyword)
      );
    }

    // 기간 필터링
    if (duration !== "all" && typeof duration !== "string") {
      if (duration.start && duration.end) {
        filtered = filtered.filter((item) => {
          const createdAt = new Date(item.createdAt);
          if (!duration || !duration.start || !duration.end) return;
          return createdAt >= duration.start && createdAt <= duration.end;
        });
      }
    }

    setFilteredData(filtered);
  };

  // 필터/검색 조건에 따라 필터링 함수 트리거
  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, duration]);

  // 기간 필터링 적용 여부에 따른 로딩 상태 업데이트
  useEffect(() => {
    if (!duration) {
      setLoading(true);
    } else setLoading(false);
  }, [duration, setLoading]);

  return (
    <div className="w-full">
      <SearchBar placeholder="학교 이름 또는 관리자 메모 내용을 입력해주세요." setKeyword={setKeyword} />

      <DurationBox handleFilterChange={handleDurationChange} />
    </div>
  );
};

export default MemberFilterAndSearchBox;
