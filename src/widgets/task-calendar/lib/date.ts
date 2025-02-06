import type { Day } from 'date-fns';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isToday,
  isValid,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

export function getDaysForMonth(
  year: number,
  month: number,
  weekStartsOn: Day = 1
) {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(new Date(year, month));
  const calendarStart = startOfWeek(start, { weekStartsOn });
  const calendarEnd = endOfWeek(end, { weekStartsOn });
  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
}

export function isSameYearMonth(date: Date, year: number, month: number) {
  return date.getFullYear() === year && date.getMonth() === month;
}

export function parseDeadline(deadline?: string): Date | null {
  if (!deadline) return null;
  const d = parseISO(deadline);
  return isValid(d) ? d : null;
}

export function isTaskForDay(deadline: Date | null, day: Date) {
  if (!deadline) return false;
  return isSameDay(deadline, day);
}

export function checkIsToday(day: Date) {
  return isToday(day);
}
