import TableSummaryText from "@/app/shared/table-summary-text";
import Pagination from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import formattedDate from "@/util/date";
import {
  SortingState,
  VisibilityState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { MemberRes } from "./filter-and-table-container";

interface MemberTableProps {
  data: MemberRes[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDataLength: number; // 총 데이터 수
}

export function MemberTable({ data, currentPage, setCurrentPage, totalPages, totalDataLength }: MemberTableProps) {
  console.log(data);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<MemberRes>();
  const columns = [
    columnHelper.display({
      header: "No.",
      cell: (data) => {
        const itemsPerPage = table.getState().pagination.pageSize;
        return totalDataLength - (currentPage - 1) * itemsPerPage - data.row.index;
      },
    }),
    columnHelper.accessor("userType", {
      cell: () => {
        const userType = "일반";
        return (
          <div
            className={`mx-auto flex h-[30px] w-[53px] items-center justify-center rounded-[50px] text-white button-s `}
          >
            {userType}
          </div>
        );
      },
      header: "회원 유형",
    }),
    columnHelper.accessor("userNo", {
      cell: (data) => data.getValue(),
      header: "회원 ID",
    }),
    columnHelper.accessor("createdAt", {
      cell: (data) => (
        <div className="flex flex-col items-center justify-center">
          <p>{formattedDate(data.getValue(), "INPUT_DATE")}</p>
          <p>{formattedDate(data.getValue())}</p>
        </div>
      ),
      header: "회원 가입일",
    }),
    columnHelper.accessor("nickname", {
      cell: () => {
        return "정보 없음";
      },
      header: "회원 닉네임",
    }),
    columnHelper.accessor("email", {
      cell: () => "dd",
      header: "회원 이메일",
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <TableSummaryText currentDataLen={data.length} totalDataLen={totalDataLength} />
      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, headerIndex) => {
                return (
                  <TableHead className={headerIndex === 0 ? "border-x" : "border-r"} key={header.id + headerIndex}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow key={row.id + rowIndex} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <TableCell
                    className={`cursor-pointer ${cellIndex === 0 ? "border-x border-t" : "border-r border-t"} ${rowIndex === table.getRowModel().rows.length - 1 ? "border-b" : ""}`}
                    key={cell.id + cellIndex}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-[200px] subtitle-1" colSpan={columns.length}>
                데이터가 존재하지 않습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {data.length > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}
