"use client";
import useGetCodeList from "@/hooks/use-get-code-list";
import { useState } from "react";
import FilterAndTableContainer from "./filter-and-table-container";

export default function CodeListContainer() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayForString = yesterday.toISOString().slice(0, 10);
  const todayForString = today.toISOString().slice(0, 10);

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState<string>(yesterdayForString);
  const [endDate, setEndDate] = useState<string>(todayForString);

  const res = useGetCodeList(pageIndex, pageSize, keyword, startDate, endDate);
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
        startDate={new Date(startDate)}
        endDate={new Date(endDate)}
        setDateRange={(s: Date | undefined, e: Date | undefined) => {
          setStartDate(s?.toISOString().slice(0, 10) || yesterdayForString);
          setEndDate(e?.toISOString().slice(0, 10) || todayForString);
          setPageIndex(1);
        }}
      />
    </div>
  );
}
