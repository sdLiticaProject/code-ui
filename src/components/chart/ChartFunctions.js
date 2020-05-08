import * as d3 from "d3";
import { height, margin, width } from "./ChartConstants";

export const clearArea = canvasRef => {
  d3.select(canvasRef.current)
    .selectAll("*")
    .remove();
};

export const drawSVG = canvasRef => {
  return d3
    .select(canvasRef.current)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
};

export const bisectDate = d3.bisector(function(d) {
  return d.x;
}).left;

export const getWidth = (currentRef) => {
  return (
    parseInt(d3.select(currentRef).style("width"), 10) -
    margin.left -
    margin.right
  );
};

export const updateCurrencyInfo = (
  lastValue,
  entirePercent,
  lastPercent,
  x,
  data,
  currentWidth
) => {
  const x0 = x.invert(currentWidth);
  const i0 = bisectDate(data, x.invert(0), 1);
  const i = bisectDate(data, x0, 1);
  const first = data[i0].y;

  const current = data[i].y;
  const prev = data[i - 1].y;
  const style = current > prev ? "green" : "red";
  const sign = current > prev ? "+" : "-";
  const diff =
    current > prev
      ? ((current - prev) * 100) / prev
      : ((prev - current) * 100) / prev;

  const styleFirst = current > first ? "green" : "red";
  const signFisrt = current > first ? "+" : "-";
  const diffFirst =
    current > first
      ? ((current - first) * 100) / first
      : ((first - current) * 100) / first;

  lastValue.html(current);
  entirePercent
    .style("color", styleFirst)
    .html(`${signFisrt}${diffFirst.toFixed(2)}%`);

  lastPercent.style("color", style).html(` ${sign}${diff.toFixed(2)}%`);
};
