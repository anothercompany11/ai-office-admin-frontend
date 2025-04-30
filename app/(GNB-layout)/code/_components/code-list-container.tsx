"use client";
import useGetCodeList from "@/hooks/use-get-code-list";
import { useState } from "react";
import FilterAndTableContainer from "./filter-and-table-container";

export default function CodeListContainer() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const res = useGetCodeList(pageIndex, pageSize);

  if (!res?.data) return null;

  return (
    <FilterAndTableContainer
      data={res.data}
      pageIndex={pageIndex}
      setPageIndex={setPageIndex}
      pageSize={pageSize}
      setPageSize={setPageSize}
      totalPages={res.meta?.total_pages || 0}
    />
  );
}
