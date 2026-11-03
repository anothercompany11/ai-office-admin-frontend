"use client";
import Loading from "@/app/shared/loading";
import SearchBar from "@/app/shared/search-bar";
import { useState } from "react";
import SpecListTable from "./spec-list-table";

export default function SpecListContainer() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [keyword, setKeyword] = useState("");

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col gap-10">
        <div className="w-full min-w-[900px]">
          <SearchBar
            placeholder="코드, 학교 이름, 명세 제목 검색"
            setKeyword={(k) => {
              setKeyword(k);
              setPageIndex(1);
            }}
            onReset={() => {
              setKeyword("");
              setPageIndex(1);
            }}
          />
        </div>
        <Loading>
          <SpecListTable
            currentPage={pageIndex}
            pageSize={pageSize}
            setPageSize={(n) => {
              setPageSize(n);
              setPageIndex(1);
            }}
            onPageChange={setPageIndex}
            keyword={keyword}
          />
        </Loading>
      </div>
    </div>
  );
}
