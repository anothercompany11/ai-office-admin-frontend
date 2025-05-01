import { useState } from "react";

interface UsePaginationProps<T> {
  data: T[] | null;
  itemsPerPage: number; // 외부에서 제어할 현재 페이지 인덱스
  pageIndex?: number;
  onPageChange?: (newPage: number) => void; // 페이지 변경 콜백
}

export function usePagination<T>({ data = [], itemsPerPage, pageIndex, onPageChange }: UsePaginationProps<T>) {
  // 내부 상태
  const [internalPage, setInternalPage] = useState(1);

  // 페이지 번호
  const currentPage = pageIndex ?? internalPage;

  // 페이지 변경 함수
  const setCurrentPage = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    } else {
      setInternalPage(newPage);
    }
  };

  if (!data) {
    return { currentData: [] as T[], currentPage, setCurrentPage, totalPages: 0 };
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = currentPage * itemsPerPage;
  const currentData = data.slice(start, end);

  return {
    currentData,
    currentPage,
    setCurrentPage,
    totalPages,
  };
}
