"use client";
import { AdminUser } from "@/app/api/dto/account";
import Pagination from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useGetAdminAccountList from "@/hooks/use-get-account-list";
import formattedDate from "@/util/date";
import { useState } from "react";
import AccountTableHeader from "./account-table-header";
import AdminDetailModal from "./admin-detail-modal";

export default function AdminUserTable() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const { data, meta } = useGetAdminAccountList(page, size);

  const totalPages = meta?.total_pages ?? 0;
  const totalItems = meta?.total ?? 0;

  return (
    <div className="space-y-4">
      <AccountTableHeader
        size={size}
        page={page}
        setPage={setPage}
        setSize={setSize}
        currentDataLen={data.length}
        totalDataLen={totalItems}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>이름</TableHead>
            <TableHead>아이디</TableHead>
            <TableHead>생성 일자</TableHead>
            <TableHead>관리</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.name ?? "관리자"}</TableCell>
              <TableCell>{user.login_id}</TableCell>
              <TableCell>{formattedDate(user.created_at)}</TableCell>
              <TableCell>
                <button onClick={() => setSelectedUser(user)}>상세보기</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPages > 0 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
      {selectedUser && (
        <AdminDetailModal
          user={selectedUser}
          handleCloseModal={() => setSelectedUser(null)}
          page={page}
          size={size}
          targetAccount={selectedUser}
        />
      )}
    </div>
  );
}
