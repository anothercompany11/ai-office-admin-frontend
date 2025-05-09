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

  // 캘린더 표시 문구
  let displayText = "날짜 선택";
  if (date.from && date.to) {
    displayText = `${formattedDate(date.from)} ~ ${formattedDate(date.to)}`;
  } else if (date.from) {
    displayText = formattedDate(date.from);
  } else if (date.to) {
    displayText = formattedDate(date.to);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn("w-[250px] relative py-3 px-4 rounded-sm border flex items-center justify-between text-[15px]")}
        >
          <span className="text-body-m text-label-alternative">{displayText}</span>
          <CalendarIcon className="absolute inset-y-0 right-0 my-auto ml-auto mr-3 size-[19px] text-black" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          formatters={{ formatCaption, formatWeekdayName }}
          mode="range"
          disabled={(date) => date > today}
          selected={date}
          onSelect={onSelectRange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarSingle;
