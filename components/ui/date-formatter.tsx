import { DateFormatter } from "react-day-picker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import React from "react";

export const formatCaption: DateFormatter = (month, options) => {
  return <>{format(month, "yyyy.MM", { locale: options?.locale })}</>;
};

export const formatWeekdayName: DateFormatter = (date) => {
  return format(date, "eeeeee", { locale: ko });
};
