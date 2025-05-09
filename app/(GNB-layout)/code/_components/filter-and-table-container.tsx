"use client";

import { Code, CodeStatus } from "@/app/api/dto/code";
import { Dispatch, SetStateAction } from "react";
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
  startDate?: Date;
  endDate?: Date;
  setDateRange: (s?: Date, e?: Date) => void;
  // 채팅 상태
  status: CodeStatus | null;
  setStatus: Dispatch<SetStateAction<CodeStatus | null>>;
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
  status,
  setStatus,
}: Props) {
  return (
    <div className="flex flex-col gap-10">
      <CodeFilterAndSearchBox
        setKeyword={setKeyword}
        startDate={startDate}
        endDate={endDate}
        setDateRange={setDateRange}
        setCurrentPage={setPageIndex}
        status={status}
        setStatus={setStatus}
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
