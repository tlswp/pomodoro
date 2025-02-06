import { describe, expect, it } from 'vitest';

import { minutesToMs, msToMinutes } from '../time-convert';

describe('minutesToMs', () => {
  it('should convert minutes to milliseconds correctly', () => {
    expect(minutesToMs(1)).toBe(60000);
    expect(minutesToMs(0)).toBe(0);
    expect(minutesToMs(2.5)).toBe(150000);
  });
});

describe('msToMinutes', () => {
  it('should convert milliseconds to minutes correctly', () => {
    expect(msToMinutes(60000)).toBe(1);
    expect(msToMinutes(0)).toBe(0);
    expect(msToMinutes(150000)).toBe(2.5);
  });
});
