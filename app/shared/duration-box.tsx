import { useEffect, useState } from "react";

import CalendarSingle, { searchDate } from "@/components/ui/calendar-single";
import FilterName from "./filter-name";

interface DurationBoxProps {
  range: searchDate;
  noBottomBorder?: boolean;
  handleFilterChange: (start?: Date, end?: Date) => void; // Updated handler type
}

const DurationBox = ({ range, noBottomBorder, handleFilterChange }: DurationBoxProps) => {
  const [date, setDate] = useState(range);

  useEffect(() => {
    if (range?.start && range?.end) setDate(range);
  }, [range]);

  const handleDateChange = (newDate: searchDate) => {
    if (newDate && newDate.start && newDate.end) {
      setDate(newDate);

      const newEnd = new Date(newDate.end);
      newEnd.setDate(newEnd.getDate() + 1);
      handleFilterChange(newDate.start, newEnd);
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
