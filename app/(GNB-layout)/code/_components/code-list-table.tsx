import { Code } from "@/app/api/dto/code";
import { SelectBox } from "@/app/shared/select-box";
import TableSummaryText from "@/app/shared/table-summary-text";
import { Checkbox } from "@/components/ui/checkbox";
import Pagination from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import formattedDate from "@/util/date";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import * as React from "react";
import CTAButtonBox from "./cta-button-box";

type Props = {
  data: Code[];
  currentPage: number;
  totalPages: number;
  totalDataLength: number;
  pageSize: number;
  setPageSize: (n: number) => void;
  onPageChange: (p: number) => void;
  limit: number;
};

export function CodeListTable({
  data,
  currentPage,
  totalPages,
  totalDataLength,
  pageSize,
  setPageSize,
  onPageChange,
  limit,
}: Props) {
  const columnHelper = createColumnHelper<Code>();
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = [
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        />
      ),
      cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} />,
    }),
    columnHelper.accessor("name", {
      header: "학교 이름",
      id: "name",
      cell: (info) => {
        const name = info.getValue<string>();
        return name && name.trim() !== "" ? name : "-";
      },
    }),
    columnHelper.accessor("code", { id: "code", header: "생성 코드" }),
    columnHelper.display({
      id: "created_at",
      header: "생성 일자",
      cell: ({ row }) => `${formattedDate(row.original.created_at)}`,
    }),
    columnHelper.display({
      header: "사용 / 가능 횟수",
      cell: ({ row }) => `${row.original.prompt_count} / ${row.original.prompt_limit}`,
    }),
    columnHelper.display({
      header: "채팅 상태",
      cell: ({ row }) => {
        const { is_limit_reached } = row.original;
        return (
          <p className={is_limit_reached ? "text-status-error" : ""}>
            {row.original.is_limit_reached ? "불가능" : "가능"}
          </p>
        );
      },
    }),
    columnHelper.display({
      id: "memo",
      header: () => <div className="w-[100px]">관리자 메모</div>,
      cell: ({ row }) => (
        <div className="w-[100px]">
          <Link
            href={`/code/${row.original.id}`}
            className="border text-label-strong border-line-strong text-title-xs rounded-[6px] py-1 px-[17px]"
          >
            상세보기
          </Link>
        </div>
      ),
      size: 100,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageIndex: currentPage - 1, pageSize } },
    onPaginationChange: (updater) => {
      const nextZero =
        typeof updater === "function"
          ? updater({ pageIndex: currentPage - 1, pageSize }).pageIndex!
          : updater.pageIndex!;
      onPageChange(nextZero + 1);
    },
    manualPagination: true,
    pageCount: totalPages,
  });

  const selectedIds = table.getSelectedRowModel().rows.map((r) => r.original.id);

  // 선택 초기화 함수
  const handleClearSelection = () => {
    setRowSelection({});
  };

  return (
    <div className="flex flex-col min-w-[900px] gap-4 overflow-x-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <TableSummaryText currentDataLen={data.length} totalDataLen={totalDataLength} />
          <SelectBox
            value={String(pageSize)}
            onChange={(val) => setPageSize(Number(val))}
            options={[10, 20, 30, 40].map((n) => ({ label: `${n}개씩 보기`, value: String(n) }))}
          />
        </div>
        <CTAButtonBox
          handleClearSelection={handleClearSelection}
          selectedIds={selectedIds}
          skip={currentPage}
          limit={limit}
        />
      </div>

      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((h, i) => (
                <TableHead
                  key={h.id}
                  className={cn(
                    // 공통 테두리
                    i === 0 ? "border-x" : "border-r",
                    // 체크박스 컬럼
                    h.column.id === "select" ? "w-[42px]" : "",
                    // 학교 이름 칼럼
                    h.column.id === "name" ? "w-[calc(25%)] min-w-[200px]" : "",
                    // 생성 코드 칼럼
                    h.column.id === "code" ? "w-[calc(15%)] min-w-[160px]" : "",
                    // 생성 일자 칼럼
                    h.column.id === "created_at" ? "w-[calc(15%)] min-w-[160px]" : "",
                    // 메모 컬럼
                    h.column.id === "memo" ? "w-[100px]" : ""
                  )}
                >
                  {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row, ri) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell, ci) => (
                  <TableCell
                    key={cell.id}
                    className={`${ci === 0 ? "border-x border-t" : "border-r border-t"} ${ri === table.getRowModel().rows.length - 1 ? "border-b" : ""}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-40 text-center">
                데이터가 존재하지 않습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
