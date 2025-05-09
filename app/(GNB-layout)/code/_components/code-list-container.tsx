"use client";
import { CodeStatus } from "@/app/api/dto/code";
import Loading from "@/app/shared/loading";
import { useState } from "react";
import CodeFilterAndSearchBox from "./code-filter-and-search-box";
import { CodeListTable } from "./code-list-table";

export default function CodeListContainer() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [status, setStatus] = useState<CodeStatus | null>(null);

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-10">
        <CodeFilterAndSearchBox
          setKeyword={setKeyword}
          startDate={startDate}
          endDate={endDate}
          setDateRange={(s?: Date, e?: Date) => {
            setStartDate(s);
            setEndDate(e);
            setPageIndex(1);
          }}
          setCurrentPage={setPageIndex}
          status={status}
          setStatus={setStatus}
        />
        <Loading>
          <CodeListTable
            pageIndex={pageIndex}
            currentPage={pageIndex}
            pageSize={pageSize}
            setPageSize={(n) => {
              setPageSize(n);
              setPageIndex(1);
            }}
            onPageChange={setPageIndex}
            limit={pageSize}
            keyword={keyword}
            startDate={startDate}
            endDate={endDate}
            status={status}
          />
        </Loading>
      </div>
    </div>
  );
}
