import { Code } from "@/app/api/dto/code";
import TableSummaryText from "@/app/shared/table-summary-text";
import { Checkbox } from "@/components/ui/checkbox";
import Pagination from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import formattedDate from "@/util/date";
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
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
};

export function CodeListTable({
  data,
  currentPage,
  totalPages,
  totalDataLength,
  pageSize,
  setPageSize,
  onPageChange,
}: Props) {
  const columnHelper = createColumnHelper<Code>();
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = [
    // (0) 체크박스
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          // indeterminate={table.getIsSomePageRowsSelected()}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          // indeterminate={row.getIsSomeSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
        />
      ),
      size: 48,
    }),
    // (1) No.
    columnHelper.display({
      header: "No.",
      cell: ({ row }) =>
        totalDataLength - (currentPage - 1) * pageSize - row.index,
    }),
    // (2) 학교 이름
    columnHelper.accessor("name", { header: "학교 이름" }),
    // (3) 생성 코드
    columnHelper.accessor("code", { header: "생성 코드" }),
    // (4) 이용 가능 횟수
    columnHelper.display({
      header: "이용 가능 횟수",
      cell: ({ row }) => `${row.original.prompt_count} / ${row.original.prompt_limit}`,
    }),
    // (5) 채팅 상태
    columnHelper.display({
      header: "채팅 상태",
      cell: ({ row }) => (row.original.is_limit_reached ? "불가능" : "가능"),
    }),
    // (6) 관리자 메모
    columnHelper.display({
      header: "관리자 메모",
      cell: ({ row }) => (
        <Link href={`/code/${row.original.id}`} className="text-primary underline">
          상세보기
        </Link>
      ),
    }),
    // (7) 생성 일자
    columnHelper.accessor("created_at", {
      header: "생성 일자",
      cell: (info) => formattedDate(info.getValue()),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageIndex: currentPage - 1, pageSize },
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater({ pageIndex: currentPage - 1, pageSize }).pageIndex : updater.pageIndex!;
      onPageChange(next + 1);
    },
  });

  const selectedIds = table.getSelectedRowModel().rows.map((r) => r.original.id);

  return (
    <div className="flex flex-col gap-4 overflow-x-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TableSummaryText currentDataLen={data.length} totalDataLen={totalDataLength} />
          <select
            className="h-8 rounded border px-2 text-sm"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 20, 30, 40].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <CTAButtonBox selectedIds={selectedIds} />
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((h, i) => (
                <TableHead key={h.id} className={i === 0 ? "border-x" : "border-r"}>
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
                    className={`${ci === 0 ? "border-x border-t" : "border-r border-t"} ${
                      ri === table.getRowModel().rows.length - 1 ? "border-b" : ""
                    }`}
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
