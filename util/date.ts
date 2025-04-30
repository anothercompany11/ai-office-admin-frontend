// 날짜 변환 함수
const formattedDate = (
  utcValue: number | null | string | undefined | Date,
  type?:
    | "DEFAULT_FULL" // 2024.01.01
    | "DEFAULT_MONTH_DATE" // 01.01
    | "TEXT_FULL" // 2024년 01월 01일
    | "TEXT_MONTH_DATE" // 01월 01일
    | "SHORTENED_YEAR_DEFAULT_FULL" // 24.01.01
    | "SHORTENED_YEAR_TEXT_FULL" // 24년 01월 01일
    | "MONTH_DATE" // 24.01
    | "MONTH_DATE_TEXT" // 24년 01월
    | "INPUT_DATE" // 2024-01-01
) => {
  if (!utcValue) return "-";

  const date = new Date(utcValue);
  const year = date.getFullYear();
  const shortenedYear = year.toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  if (type === "DEFAULT_FULL") {
    return `${year}.${month}.${day}`;
  }

  if (type === "DEFAULT_MONTH_DATE") {
    return `${month}.${day}`;
  }

  if (type === "TEXT_FULL") {
    return `${year}년 ${month}월 ${day}일`;
  }

  if (type === "TEXT_MONTH_DATE") {
    return `${month}월 ${day}일`;
  }

  if (type === "SHORTENED_YEAR_DEFAULT_FULL") {
    return `${shortenedYear}.${month}.${day}`;
  }

  if (type === "SHORTENED_YEAR_TEXT_FULL") {
    return `${shortenedYear}년 ${month}월 ${day}일`;
  }

  if (type === "MONTH_DATE") {
    return `${shortenedYear}.${month}`;
  }

  if (type === "MONTH_DATE_TEXT") {
    return `${shortenedYear}년 ${month}월`;
  }

  if (type === "INPUT_DATE") {
    return `${year}-${month}-${day}`;
  }

  return `${hours}:${minutes}:${seconds}`;
};

export default formattedDate;
