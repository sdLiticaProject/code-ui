import * as d3 from 'd3';

export const colorScheme = ['#e35955', '#f28e2c', '#4e79a7', '#76b7b2', '#59a14f', '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'];

export const margin = { top: 10, right: 20, bottom: 170, left: 40 };
export const margin2 = { top: 380, right: 20, bottom: 70, left: 40 };
export const width = 960 - margin.left - margin.right;
export const height = 500 - margin.top - margin.bottom;
export const height2 = 500 - margin2.top - margin2.bottom;
export const transformTime = 500;
export const units = 'º';

const formatMillisecond = d3.timeFormat('.%L');
const formatSecond = d3.timeFormat(':%S');
const formatMinute = d3.timeFormat('%I:%M');
const formatHour = d3.timeFormat('%I %p');
const formatDay = d3.timeFormat('%b %d');
const formatWeek = d3.timeFormat('%b %d');
const formatMonth = d3.timeFormat('%B');
const formatYear = d3.timeFormat('%Y');

export function timeFormat(date) {
  return (
    d3.timeSecond(date) < date
      ? formatMillisecond
      : d3.timeMinute(date) < date
      ? formatSecond
      : d3.timeHour(date) < date
      ? formatMinute
      : d3.timeDay(date) < date
      ? formatHour
      : d3.timeMonth(date) < date
      ? d3.timeWeek(date) < date
        ? formatDay
        : formatWeek
      : d3.timeYear(date) < date
      ? formatMonth
      : formatYear
  )(date);
}
