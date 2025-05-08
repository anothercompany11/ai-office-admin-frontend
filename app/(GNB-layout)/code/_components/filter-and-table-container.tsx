"use client";
import { Code } from "@/app/api/dto/code";
import { useEffect, useState } from "react";
import CodeFilterAndSearchBox from "./code-filter-and-search-box";
import { CodeListTable } from "./code-list-table";

interface Props {
  data: Code[];
  pageIndex: number;
  setPageIndex: (idx: number) => void;
  pageSize: number;
  setPageSize: (n: number) => void;
  totalPages: number;
}

export default function FilterAndTableContainer({
  data,
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
  totalPages,
}: Props) {
  const [filteredData, setFilteredData] = useState<Code[]>(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const currentData = filteredData;
  const currentPage = pageIndex;

  return (
    <div className="flex flex-col gap-10">
      <CodeFilterAndSearchBox
        data={data}
        setFilteredData={(d) => {
          setFilteredData(d);
        }}
        setCurrentPage={setPageIndex}
      />
      <CodeListTable
        data={currentData}
        currentPage={currentPage}
        totalPages={totalPages}
        totalDataLength={filteredData.length}
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
