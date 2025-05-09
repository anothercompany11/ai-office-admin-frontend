import CalendarSingle from "@/components/ui/calendar-single";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import FilterName from "./filter-name";

interface DurationBoxProps {
  range: DateRange;
  noBottomBorder?: boolean;
  handleFilterChange: (from?: Date, to?: Date) => void;
}

const DurationBox = ({ range, noBottomBorder, handleFilterChange }: DurationBoxProps) => {
  const [date, setDate] = useState<DateRange>(range);

  useEffect(() => {
    setDate(range);
  }, [range, range?.from, range?.to]);

  return (
    <div className={`flex h-[72px] ${noBottomBorder ? "border-x" : "border-x border-b"}`}>
      <FilterName name="기간검색" />
      <div className="pl-6 flex items-center">
        <CalendarSingle
          date={date}
          setDate={(newRange) => {
            setDate(newRange);
            handleFilterChange(newRange?.from, newRange?.to);
          }}
        />
      </div>
    </div>
  );
};

export default DurationBox;
