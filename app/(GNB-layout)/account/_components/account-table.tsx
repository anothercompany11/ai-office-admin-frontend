"use client";
import TableSummaryText from "@/app/shared/table-summary-text";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useGetAdminAccountList from "@/hooks/use-get-account-list";

import React from "react";

export default function AdminUserTable() {
  const [page, setPage] = React.useState(1);
  const [size, setSize] = React.useState(10);
  const { data, meta } = useGetAdminAccountList(page, size);

  const totalPages = meta?.total_pages ?? 0;
  const totalItems = meta?.total ?? 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TableSummaryText currentDataLen={data.length} totalDataLen={totalItems} />
          <select
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
              setPage(1);
            }}
            className="h-8 rounded border px-2 text-sm"
          >
            {[10, 20, 30, 40].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <Button
          onClick={() => {
            /* TODO: 생성 모달 열기 */
          }}
        >
          생성하기
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>로그인 ID</TableHead>
            <TableHead>이름</TableHead>
            <TableHead>활성 여부</TableHead>
            <TableHead>최종 로그인</TableHead>
            <TableHead>슈퍼 관리자</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.login_id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.is_active ? "활성" : "비활성"}</TableCell>
              <TableCell>{new Date(user.last_login_at).toLocaleString()}</TableCell>
              <TableCell>{user.is_super_admin ? "예" : "아니오"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPages > 0 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
    </div>
  );
}
