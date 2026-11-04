"use client";
import { SpecSummary } from "@/app/api/dto/spec";
import { SelectBox } from "@/app/shared/select-box";
import TableSummaryText from "@/app/shared/table-summary-text";
import Pagination from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useGetSpecList from "@/hooks/use-get-spec-list";
import { cn } from "@/lib/utils";
import formattedDate from "@/util/date";
import Link from "next/link";
import { useState } from "react";
import SpecDetailModal from "./spec-detail-modal";

interface SpecListTableProps {
  currentPage: number;
  pageSize: number;
  setPageSize: (n: number) => void;
  onPageChange: (p: number) => void;
  keyword: string;
}

export default function SpecListTable({
  currentPage,
  pageSize,
  setPageSize,
  onPageChange,
  keyword,
}: SpecListTableProps) {
  const res = useGetSpecList(currentPage, pageSize, keyword);
  const data: SpecSummary[] = res?.data || [];

  // 열람 중인 결과물
  const [openedSpecId, setOpenedSpecId] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-w-[900px] gap-4 overflow-x-auto">
      <div className="flex items-center gap-3">
        <TableSummaryText currentDataLen={data.length} totalDataLen={res?.meta?.total || 0} />
        <SelectBox
          value={String(pageSize)}
          onChange={(val) => setPageSize(Number(val))}
          options={[10, 20, 30, 40].map((n) => ({ label: `${n}개씩 보기`, value: String(n) }))}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="border-x w-[140px]">생성 코드</TableHead>
            <TableHead className="border-r w-[180px] min-w-[160px]">학교 이름</TableHead>
            <TableHead className="border-r min-w-[200px]">결과물 제목</TableHead>
            <TableHead className="border-r w-[90px]">버전</TableHead>
            <TableHead className="border-r w-[110px]">기획 충족</TableHead>
            <TableHead className="border-r w-[110px]">본문 길이</TableHead>
            <TableHead className="border-r w-[160px]">생성 일자</TableHead>
            <TableHead className="border-r w-[160px]">열람</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((spec, index) => {
              const isLast = index === data.length - 1;
              const border = (first?: boolean) =>
                cn(first ? "border-x border-t" : "border-r border-t", isLast ? "border-b" : "");

              return (
                <TableRow key={spec.id}>
                  <TableCell className={border(true)}>{spec.code}</TableCell>
                  <TableCell className={border()}>{spec.school_name?.trim() || "-"}</TableCell>
                  <TableCell className={border()}>
                    <p>{spec.title?.trim() || "-"}</p>
                    {/* 되말한 목표가 있으면 그것을 보여준다. 대화 제목은 첫 메시지에서 자동으로 붙은 것이다 */}
                    {(spec.goal?.trim() || spec.conversation_title) && (
                      <p className="text-body-2 text-label-alternative">
                        {spec.goal?.trim() || spec.conversation_title}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className={border()}>v{spec.version}</TableCell>
                  <TableCell className={border()}>
                    {/* 항목 수는 대화마다 다르다. 체크리스트가 없는 대화는 분모가 0 이다 */}
                    {spec.coverage_total > 0 ? (
                      <p
                        className={
                          spec.coverage_filled < spec.coverage_total ? "text-status-error" : "text-label-strong"
                        }
                      >
                        {spec.coverage_filled} / {spec.coverage_total}
                      </p>
                    ) : (
                      <p className="text-label-alternative">-</p>
                    )}
                  </TableCell>
                  <TableCell className={border()}>{spec.content_length.toLocaleString()}자</TableCell>
                  <TableCell className={border()}>{formattedDate(spec.created_at)}</TableCell>
                  <TableCell className={border()}>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setOpenedSpecId(spec.id)}
                        className="border text-label-strong border-line-strong text-title-xs rounded-[6px] py-1 px-[17px]"
                      >
                        결과 보기
                      </button>
                      <Link href={`/code/${spec.code_id}`} className="text-title-xs text-label-alternative underline">
                        대화
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-40 text-center">
                생성된 결과물이 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination currentPage={currentPage} totalPages={res?.meta?.total_pages || 0} onPageChange={onPageChange} />

      {openedSpecId && <SpecDetailModal specId={openedSpecId} onClose={() => setOpenedSpecId(null)} />}
    </div>
  );
}
