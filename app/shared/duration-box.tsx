import { useState } from "react";

import CalendarSingle, { searchDate } from "@/components/ui/calendar-single";
import FilterName from "./filter-name";

interface DurationBoxProps {
  noBottomBorder?: boolean;
  handleFilterChange: (start?: Date, end?: Date) => void; // Updated handler type
}

const DurationBox = ({ noBottomBorder, handleFilterChange }: DurationBoxProps) => {
  const [date, setDate] = useState<searchDate>({
    start: undefined,
    end: undefined,
  });

  const handleDateChange = (newDate: searchDate) => {
    if (newDate && newDate.start && newDate.end) {
      setDate(newDate);
      const newEndDate = new Date(newDate.end);
      newEndDate.setDate(newEndDate.getDate() + 1); // 하루 더하기
      handleFilterChange(newDate.start, newEndDate);
    }
  };

  return (
    <div className={`flex h-[72px] ${noBottomBorder ? "border-x" : "border-x border-b"}`}>
      <FilterName name="기간검색" />

      <div className="ml-2 flex shrink-0 items-center gap-2">
        <CalendarSingle date={date} setDate={handleDateChange} />
      </div>
    </div>
  );
};

export default DurationBox;
