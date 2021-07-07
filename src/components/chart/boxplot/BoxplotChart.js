import React, { useEffect } from 'react';
import { withTheme } from 'styled-components';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import { Canvas, CanvasWrapper, ChartContainer } from './BoxplotChart.styles';
import { clearArea, drawSVG, getWidth } from '../ChartFunctions';
import { heightDefault, margin } from '../ChartConstants';

const mapStateToProps = (state) => ({});

const BoxplotChart = (props) => {
  const canvas = React.createRef();
  const canvasWrapperRef = React.createRef();

  useEffect(() => {
    clearArea(canvas);

    const height = heightDefault;
    const svg = drawSVG(canvas, height);
    const width = getWidth(canvasWrapperRef.current);

    const x = d3.scaleBand().range([0, width]).domain(['setosa', 'versicolor', 'virginica']).paddingInner(1).paddingOuter(0.5);

    const y = d3.scaleLinear().domain([3, 9]).range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    const boxplotChart = svg.append('g').attr('class', 'chart').attr('transform', `translate(${margin.left},${margin.top})`);

    boxplotChart.append('g').attr('transform', `translate(0,${height})`).call(xAxis);

    boxplotChart.append('g').call(yAxis);

    d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv').then((data) => {
      // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
      const sumstat = d3
        .nest() // nest function allows to group the calculation per level of a factor
        .key(function (d) {
          return d.Species;
        })
        .rollup(function (d) {
          const q1 = d3.quantile(
            d
              .map(function (g) {
                return g.Sepal_Length;
              })
              .sort(d3.ascending),
            0.25,
          );
          const median = d3.quantile(
            d
              .map(function (g) {
                return g.Sepal_Length;
              })
              .sort(d3.ascending),
            0.5,
          );
          const q3 = d3.quantile(
            d
              .map(function (g) {
                return g.Sepal_Length;
              })
              .sort(d3.ascending),
            0.75,
          );
          const interQuantileRange = q3 - q1;
          const min = q1 - 1.5 * interQuantileRange;
          const max = q3 + 1.5 * interQuantileRange;
          return {
            q1,
            median,
            q3,
            interQuantileRange,
            min,
            max,
          };
        })
        .entries(data);

      // Show the main vertical line
      boxplotChart
        .selectAll('vertLines')
        .data(sumstat)
        .enter()
        .append('line')
        .attr('x1', function (d) {
          return x(d.key);
        })
        .attr('x2', function (d) {
          return x(d.key);
        })
        .attr('y1', function (d) {
          return y(d.value.min);
        })
        .attr('y2', function (d) {
          return y(d.value.max);
        })
        .attr('stroke', 'black')
        .style('width', 40);

      // rectangle for the main box
      const boxWidth = 100;
      boxplotChart
        .selectAll('boxes')
        .data(sumstat)
        .enter()
        .append('rect')
        .attr('x', function (d) {
          return x(d.key) - boxWidth / 2;
        })
        .attr('y', function (d) {
          return y(d.value.q3);
        })
        .attr('height', function (d) {
          return y(d.value.q1) - y(d.value.q3);
        })
        .attr('width', boxWidth)
        .attr('stroke', 'black')
        .style('fill', '#69b3a2');

      // Show the median
      boxplotChart
        .selectAll('medianLines')
        .data(sumstat)
        .enter()
        .append('line')
        .attr('x1', function (d) {
          return x(d.key) - boxWidth / 2;
        })
        .attr('x2', function (d) {
          return x(d.key) + boxWidth / 2;
        })
        .attr('y1', function (d) {
          return y(d.value.median);
        })
        .attr('y2', function (d) {
          return y(d.value.median);
        })
        .attr('stroke', 'black')
        .style('width', 80);
    });
  });

  return (
    <ChartContainer>
      <CanvasWrapper ref={canvasWrapperRef}>
        <Canvas ref={canvas} />
      </CanvasWrapper>
    </ChartContainer>
  );
};

export default withTheme(connect(mapStateToProps, {})(BoxplotChart));
