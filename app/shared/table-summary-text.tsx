interface TableSummaryTextProps {
  currentDataLen: number; // 현재 페이지의 데이터 수
  totalDataLen: number; // 총 데이터 수
  desc?: string; // 설명
}
const TableSummaryText = ({ currentDataLen, totalDataLen, desc }: TableSummaryTextProps) => {
  return (
    <div className="flex gap-[6px] subtitle-1">
      <span>{currentDataLen.toLocaleString()}건 조회</span>
      <span>{`/`}</span>
      <span>총 {totalDataLen.toLocaleString()}건</span>
      {desc && <span>{desc}</span>}
    </div>
  );
};
export default TableSummaryText;
