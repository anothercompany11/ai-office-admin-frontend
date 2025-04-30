import { useState } from "react";

interface UsePaginationProps<T> {
  data: T[] | null;
  itemsPerPage: number;
}

export function usePagination<T>({ data = [], itemsPerPage }: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  if (!data) {
    return { currentData: [], currentPage, setCurrentPage, totalPages: 0 };
  }
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return {
    currentData, // 현재 데이터
    currentPage, // 현재 보여지는 페이지
    setCurrentPage, // 페이지 변경 함수
    totalPages, // 전체 페이지 수
  };
}
