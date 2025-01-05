import { useState } from 'react';

import { getDaysForMonth } from '../lib/date';

export function useCalendar() {
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());

  function goToToday() {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  }

  function goToPreviousMonth() {
    let year = currentYear;
    let month = currentMonth - 1;
    if (month < 0) {
      month = 11;
      year--;
    }
    setCurrentYear(year);
    setCurrentMonth(month);
  }

  function goToNextMonth() {
    let year = currentYear;
    let month = currentMonth + 1;
    if (month > 11) {
      month = 0;
      year++;
    }
    setCurrentYear(year);
    setCurrentMonth(month);
  }

  const days = getDaysForMonth(currentYear, currentMonth);

  return {
    currentYear,
    currentMonth,
    days,
    goToToday,
    goToPreviousMonth,
    goToNextMonth,
  };
}
