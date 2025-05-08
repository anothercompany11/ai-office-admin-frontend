"use client";
import { Calendar } from "@/components/ui/calendar";
import { formatCaption, formatWeekdayName } from "@/components/ui/date-formatter";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import formattedDate from "@/util/date";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

type CalendarSingleProps = {
  date: DateRange;
  setDate: (data: DateRange) => void;
};

const CalendarSingle = ({ date, setDate }: CalendarSingleProps) => {
  const today = new Date();

  const onSelectRange = (newRange: DateRange | undefined) => {
    if (newRange) {
      setDate({ from: newRange.from, to: newRange.to });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "w-[250px] p-3 rounded-sm border relative text-[15px] max-h-12 items-center justify-between text-left"
          )}
        >
          <span className="flex gap-3 subtitle-3">
            <input
              type="text"
              readOnly
              value={date && date.from ? formattedDate(date.from) : "연도. 월. 일"}
              placeholder="Start date"
              className="max-w-[80px] bg-transparent focus:outline-none"
            />
            <span>~</span>
            <input
              type="text"
              readOnly
              value={date && date.to ? formattedDate(date.to) : "연도. 월. 일"}
              placeholder="End date"
              className="max-w-[80px] bg-transparent focus:outline-none"
            />
          </span>
          <CalendarIcon className="absolute inset-y-0 right-0 my-auto ml-auto mr-3 size-[19px] text-black" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          formatters={{ formatCaption, formatWeekdayName }}
          mode="range"
          disabled={(date) => date > today} // 현재 날짜 이후는 선택 불가
          selected={date}
          onSelect={onSelectRange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarSingle;
