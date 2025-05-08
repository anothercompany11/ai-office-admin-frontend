import { ChevronLeft, ChevronRight, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const maxPagesToShow = 10;
  const startPage = Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          type="button"
          key={i}
          onClick={() => onPageChange(i)}
          className={`h-6 min-w-[30px] text-center ${currentPage === i ? "underline underline-offset-4 text-label-strong" : "text-label-alternative"}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const goToFirstPage = () => onPageChange(1);
  const goToLastPage = () => onPageChange(totalPages);
  const goToPreviousPageSet = () => onPageChange(startPage - maxPagesToShow);
  const goToNextPageSet = () => onPageChange(startPage + maxPagesToShow);

  return (
    <div className="mt-6 flex w-full justify-center">
      <div className="flex w-full max-w-max gap-2 rounded-md text-black">
        {currentPage > 1 && startPage > 10 && (
          <>
            <button type="button" onClick={goToFirstPage}>
              <ChevronsLeftIcon className="size-5 text-[#4F5565]" />
            </button>
            <button type="button" onClick={goToPreviousPageSet}>
              <ChevronLeft className="size-5 text-[#4F5565]" />
            </button>
          </>
        )}

        <p className={`flex items-center text-subtitle-s`}>{renderPageNumbers()}</p>

        {endPage < totalPages && (
          <>
            <button type="button" onClick={goToNextPageSet}>
              <ChevronRight className="size-5 text-[#4F5565]" />
            </button>
            {endPage < totalPages && (
              <button type="button" onClick={goToLastPage}>
                <ChevronsRightIcon className="size-5 text-[#4F5565]" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Pagination;
