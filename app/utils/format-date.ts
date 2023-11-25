export function formatDate(date: string) {
  const d = new Date(date);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

  return `${day}-${month}-${year}`;
}

export function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function getDayName(_date: Date) {
  return _date.toLocaleString(undefined, { weekday: "short" })?.split(",")[0];
}
