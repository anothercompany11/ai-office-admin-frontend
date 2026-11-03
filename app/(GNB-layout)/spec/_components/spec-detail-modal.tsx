"use client";
import { downloadSpec } from "@/app/api/spec";
import MarkdownRenderer from "@/app/shared/markdown-renderer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useGetSpecDetail from "@/hooks/use-get-spec-detail";
import { cn } from "@/lib/utils";
import formattedDate from "@/util/date";
import { useState } from "react";
import { toast } from "sonner";

interface SpecDetailModalProps {
  specId: string;
  onClose: () => void;
}

export default function SpecDetailModal({ specId, onClose }: SpecDetailModalProps) {
  // 버전을 바꾸면 그 버전의 id 로 다시 조회한다
  const [viewingId, setViewingId] = useState(specId);
  const { detail, isLoading } = useGetSpecDetail(viewingId);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!detail) return;
    setIsDownloading(true);
    try {
      await downloadSpec(detail.id, detail.filename);
    } catch {
      toast("다운로드 실패", { description: "잠시 후 다시 시도해주세요" });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[90vw] sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>{detail?.title?.trim() || "구현 명세"}</DialogTitle>
        </DialogHeader>

        {isLoading && !detail ? (
          <div className="h-[320px] flex items-center justify-center text-label-alternative">불러오는 중...</div>
        ) : !detail ? (
          <div className="h-[320px] flex items-center justify-center text-label-alternative">
            명세를 불러올 수 없습니다.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* 메타 정보 */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-body-2 text-label-alternative">
              <span>
                {detail.code} · {detail.school_name?.trim() || "-"}
              </span>
              <span>
                기획 충족 {detail.coverage_filled} / {detail.coverage_total}
              </span>
              <span>{detail.content_length.toLocaleString()}자</span>
              <span>{formattedDate(detail.created_at)}</span>
            </div>

            {/* 버전 전환 — 2개 이상일 때만 */}
            {detail.versions.length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-subtitle-m">버전</span>
                {detail.versions.map((version) => (
                  <button
                    key={version.id}
                    type="button"
                    onClick={() => setViewingId(version.id)}
                    className={cn(
                      "border rounded-[6px] py-1 px-3 text-title-xs",
                      version.id === detail.id
                        ? "border-label-strong text-label-strong"
                        : "border-line text-label-alternative"
                    )}
                  >
                    v{version.version}
                  </button>
                ))}
              </div>
            )}

            {/* 본문 */}
            <div className="max-h-[60vh] overflow-y-auto rounded-lg border border-line bg-white p-5">
              <MarkdownRenderer content={detail.content} />
            </div>

            <div className="flex justify-end gap-2">
              <Button size="lg" variant="outline" type="button" onClick={onClose}>
                닫기
              </Button>
              <Button size="lg" type="button" loading={isDownloading} onClick={handleDownload}>
                {detail.filename} 내려받기
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
