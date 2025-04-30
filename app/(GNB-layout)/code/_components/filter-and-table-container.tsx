"use client";
import { Code } from "@/app/api/dto/code";
import { usePagination } from "@/hooks/use-pagination";
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
    "업데이트!";
    setFilteredData(data);
  }, [data]);

  const { currentData, currentPage, setCurrentPage } = usePagination({
    data: filteredData,
    itemsPerPage: pageSize,
    pageIndex: pageIndex + 1,
    onPageChange: (p) => setPageIndex(p - 1),
  });

  useEffect(() => {
    setCurrentPage(pageIndex + 1);
  }, [pageIndex, setCurrentPage]);

  return (
    <>
      <CodeFilterAndSearchBox
        data={data}
        setFilteredData={(d) => {
          setFilteredData(d);
          setPageIndex(0);
        }}
        setCurrentPage={(p) => setPageIndex(p - 1)}
      />
      <CodeListTable
        data={currentData}
        currentPage={currentPage}
        totalPages={totalPages}
        totalDataLength={filteredData.length}
        pageSize={pageSize}
        setPageSize={(n) => {
          setPageSize(n);
          setPageIndex(0);
        }}
        onPageChange={(p) => setPageIndex(p - 1)}
        skip={(currentPage - 1) * pageSize}
        limit={pageSize}
      />
    </>
  );
}
