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
