"use client";
import { Code } from "@/app/api/dto/code";
import CodeFilterAndSearchBox from "./code-filter-and-search-box";
import { CodeListTable } from "./code-list-table";

interface Props {
  data: Code[];
  pageIndex: number;
  setPageIndex: (p: number) => void;
  pageSize: number;
  setPageSize: (n: number) => void;
  totalPages: number;
  totalDataLength: number;

  // 날짜 관련
  setKeyword: (k: string) => void;
  startDate: Date;
  endDate: Date;
  setDateRange: (s: Date | undefined, e: Date | undefined) => void;
}

export default function FilterAndTableContainer({
  data,
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
  totalPages,
  totalDataLength,

  setKeyword,
  startDate,
  endDate,
  setDateRange,
}: Props) {
  return (
    <div className="flex flex-col gap-10">
      <CodeFilterAndSearchBox
        setKeyword={setKeyword}
        startDate={startDate}
        endDate={endDate}
        setDateRange={setDateRange}
        setCurrentPage={setPageIndex}
      />
      <CodeListTable
        data={data}
        currentPage={pageIndex}
        totalPages={totalPages}
        totalDataLength={totalDataLength}
        pageSize={pageSize}
        setPageSize={(n) => {
          setPageSize(n);
          setPageIndex(1);
        }}
        onPageChange={setPageIndex}
        limit={pageSize}
      />
    </div>
  );
}
