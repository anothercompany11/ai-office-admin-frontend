"use client";
import { CodeStatus } from "@/app/api/dto/code";
import useGetCodeList from "@/hooks/use-get-code-list";
import { useState } from "react";
import FilterAndTableContainer from "./filter-and-table-container";

export default function CodeListContainer() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [status, setStatus] = useState<CodeStatus | null>(null);

  const res = useGetCodeList(
    pageIndex,
    pageSize,
    keyword,
    startDate ? startDate.toISOString().slice(0, 10) : undefined,
    endDate ? endDate.toISOString().slice(0, 10) : undefined,
    status
  );
  if (!res?.data) return null;

  return (
    <div className="overflow-x-auto">
      <FilterAndTableContainer
        data={res.data}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageSize={pageSize}
        setPageSize={(n) => {
          setPageSize(n);
          setPageIndex(1);
        }}
        totalPages={res.meta?.total_pages || 0}
        totalDataLength={res.meta?.total || 0}
        // 검색 키워드
        setKeyword={(k) => {
          setKeyword(k);
          setPageIndex(1);
        }}
        // 검색 날짜
        startDate={startDate}
        endDate={endDate}
        setDateRange={(s?: Date, e?: Date) => {
          setStartDate(s);
          setEndDate(e);
          setPageIndex(1);
        }}
        // 채팅 상태
        status={status}
        setStatus={setStatus}
      />
    </div>
  );
}
