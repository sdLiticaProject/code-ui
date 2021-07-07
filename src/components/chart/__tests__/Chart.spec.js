import { describe, expect, it } from '@jest/globals';
import rate from '../../../data/currencyData.json';
import { calculateDateEnd } from '../ChartFunctions';
import { ALL_TIME, ONE_DAY, ONE_MONTH, ONE_WEEK, ONE_YEAR } from '../../../constants/timePeriods';

describe('Chart', () => {
  describe('calculateDateEnd', () => {
    const data = rate.map((d) => {
      return {
        x: new Date(d.DATE),
        y: d.CLOSE,
      };
    });
    it('should return +1 day if period of time is 1 day', () => {
      const startDate = new Date(2020, 0, 1);
      const result = calculateDateEnd(startDate, ONE_DAY, data);
      expect(result).toStrictEqual(new Date(2020, 0, 2));
    });
    it('should return +7 days if period of time is 1 week', () => {
      const startDate = new Date(2020, 0, 1);
      const result = calculateDateEnd(startDate, ONE_WEEK, data);
      expect(result).toStrictEqual(new Date(2020, 0, 8));
    });
    it('should return +1 month if period of time is 1 month', () => {
      const startDate = new Date(2020, 0, 1);
      const result = calculateDateEnd(startDate, ONE_MONTH, data);
      expect(result).toStrictEqual(new Date(2020, 1, 1));
    });
    it('should return +1 year if period of time is 1 year', () => {
      const startDate = new Date(2020, 0, 1);
      const result = calculateDateEnd(startDate, ONE_YEAR, data);
      expect(result).toStrictEqual(new Date(2021, 0, 1));
    });
    it('should return last element from data', () => {
      const startDate = new Date(2020, 0, 1);
      const result = calculateDateEnd(startDate, ALL_TIME, data);
      expect(result).toStrictEqual(data[data.length - 1].x);
    });
  });
});
