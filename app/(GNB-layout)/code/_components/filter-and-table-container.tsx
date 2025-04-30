import { LoadIcon } from "@/app/shared/loading";
import { usePagination } from "@/hooks/use-pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MemberFilterAndSearchBox from "./member-filter-and-search-box";
import { MemberTable } from "./member-table";

export interface MemberRes {
  id: string; // 회원 id
  userNo: string; // 회원 No
  userType: string; // 회원 유형 [작가 | 일반 회원]
  createdAt: string; // 가입일
  nickname: string; // 닉네임
  email: string;
}

interface FilterAndTableContainerProps {
  data: MemberRes[];
}

const FilterAndTableContainer = ({ data }: FilterAndTableContainerProps) => {
  const [filteredData, setFilteredData] = useState(data);
  const { currentData, currentPage, setCurrentPage, totalPages } = usePagination({
    data: filteredData,
    itemsPerPage: 10,
  });
  const prev = useSearchParams().get("prev");
  const [isLoading, setLoading] = useState(true); // 기간 필터링이 적용되었는지에 따라 변경되는 로딩 상태

  useEffect(() => {
    if (prev) {
      setCurrentPage(Number(prev));
    }
  }, [prev, setCurrentPage]);

  return (
    <>
      <MemberFilterAndSearchBox
        data={data}
        setFilteredData={setFilteredData}
        setLoading={setLoading}
        setCurrentPage={setCurrentPage}
      />
      {isLoading ? (
        <LoadIcon />
      ) : (
        <MemberTable
          data={currentData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalDataLength={filteredData.length}
        />
      )}
    </>
  );
};
export default FilterAndTableContainer;
