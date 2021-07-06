import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import moment from 'moment';
import { connect } from 'react-redux';
import data from './data/exampleDegrees.json';
import { clearArea, drawLine, drawSVG, getBisectDate, getWidth, updateCurrencyInfo } from './ChartFunctions';
import { colorScheme, height, height2, margin, margin2, timeFormat, transformTime } from './ChartConstants';
import { Btn, Canvas, CurrencyInfo, ChartContainer, InfoWrapper, BtnWrapper, CanvasWrapper, LineName } from './Chart.styles';
import { getDoShow, getLines } from '../../reducers/controlReducer';

const dataBtn = ['1d', '1w', '1m', '1y', 'All time'];
const linesForExtent = ['New York_1', 'San Francisco_1', 'Austin_1', 'New York_2', 'San Francisco_2', 'Austin_2'];

const mapStateToProps = (state) => ({
  doShow: getDoShow(state),
  lines: getLines(state),
});

const colorMap = new Map();
let colorCounter = 0;

const parseTime = d3.timeParse('%Y%m%d');
const formatValue = d3.format(',.0f');
data.forEach((d) => {
  d.date = parseTime(d.date);
  return d;
});

const ExampleChart = (props) => {
  const { lines } = props;
  lines.forEach((l) => {
    if (!colorMap.has(l)) {
      colorMap.set(l, colorScheme[colorCounter]);
      colorCounter += 1;
    }
  });
  const showInfo = props.doShow;
  const [zoomState, setZoomState] = React.useState(false);
  const canvas = React.createRef();
  const btnsRef = React.useState(dataBtn.map(() => React.createRef()))[0];
  const [activeButton, setActiveButton] = React.useState(btnsRef[btnsRef.length - 1]);

  const currencyInfoRef = React.useState(lines.map(() => React.createRef()))[0];
  const balanceRef = React.useState(lines.map(() => React.createRef()))[0];
  const entirePercentRef = React.useState(lines.map(() => React.createRef()))[0];
  const lastPercentRef = React.useState(lines.map(() => React.createRef()))[0];
  const lineNameRef = React.useState(lines.map(() => React.createRef()))[0];

  const canvasWrapperRef = React.createRef();
  const firstDateOfData = data[0].date;
  const lastDateOfData = data[data.length - 1].date;

  const [sizeState, setSizeState] = useState();

  function handleUpdate() {
    setSizeState(window.innerWidth);
  }

  useEffect(() => {
    const multiData = lines.map((id) => {
      return {
        id,
        values: data.map((d) => {
          return { x: d.date, y: +d[id] };
        }),
      };
    });

    const multiDataForExtent = linesForExtent.map((id) => {
      return {
        id,
        values: data.map((d) => {
          return { x: d.date, y: +d[id] };
        }),
      };
    });

    window.addEventListener('resize', handleUpdate);
    clearArea(canvas);

    const svg = drawSVG(canvas);

    const width = getWidth(canvasWrapperRef.current);

    const x = d3.scaleTime().range([0, width]);
    const x2 = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const y2 = d3.scaleLinear().range([height2, 0]);
    const ticksCount = width / 60;
    const xAxis = d3.axisBottom(x).tickFormat(timeFormat).ticks(ticksCount);
    const xAxis2 = d3.axisBottom(x2).ticks(ticksCount);
    const yAxis = d3.axisLeft(y);

    const zoom = d3
      .zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .extent([
        [0, 0],
        [width, height],
      ])
      .on('zoom', zoomed);

    const brush = d3
      .brushX()
      .extent([
        [0, 0],
        [width, height2],
      ])
      .on('brush end', brushed);

    const area = d3
      .area()
      .x((d) => x(d.x))
      .y0(height)
      .y1((d) => y(d.y));

    const linePath = d3
      .line()
      .x((d) => x(d.x))
      .y((d) => y(d.y));

    svg
      .append('defs')
      .append('svg:clipPath')
      .attr('id', 'clip')
      .append('svg:rect')
      .attr('width', width)
      .attr('height', height)
      .attr('x', 0)
      .attr('y', 0)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${width} ${height}`);

    const svgDefs = svg.append('defs');

    const mainGradient = svgDefs.append('linearGradient').attr('id', 'mainGradient').attr('x1', '0%').attr('x2', '0%').attr('y1', '0%').attr('y2', '100%');
    mainGradient.append('stop').attr('class', 'stop-left').style('stop-color', '#f28e2c').attr('offset', '0');

    mainGradient.append('stop').attr('class', 'stop-right').attr('offset', '1');

    const lineChart = svg.append('g').attr('class', 'chart').attr('transform', `translate(${margin.left},${margin.top})`).attr('clip-path', 'url(#clip)');

    const focus = svg.append('g').attr('class', 'focus').attr('transform', `translate(${margin.left},${margin.top})`);

    const zoomscale = svg.append('g').attr('class', 'context').attr('transform', `translate(${margin2.left},${margin2.top})`);

    x.domain(d3.extent(data, (d) => d.date));
    y.domain([d3.min(multiDataForExtent, (d) => d3.min(d.values, (c) => c.y - 10)), d3.max(multiDataForExtent, (d) => d3.max(d.values, (c) => c.y + 10))]);

    x2.domain(x.domain());
    y2.domain(y.domain());

    focus.append('g').attr('class', 'axis axis--x').attr('transform', `translate(0,${height})`).call(xAxis);

    focus.append('g').attr('class', 'axis axis--y').call(yAxis);

    zoomscale.append('g').attr('class', 'axis axis--x').attr('transform', `translate(0,${height2})`).call(xAxis2);

    zoomscale.append('g').attr('class', 'brush').call(brush).call(brush.move, x.range());

    // TOOLTIP START

    const focusPoints = focus.append('g').attr('class', 'focusPoints').style('display', 'none');

    focusPoints.append('line').attr('class', 'x-hover-line hover-line').attr('y1', 0).attr('y2', height);

    focusPoints.append('rect').attr('class', 'tooltip').attr('rx', 5).attr('ry', 5).attr('width', 120).attr('height', 90);

    const labels = focusPoints.selectAll('.lineHoverText').data(lines);

    labels
      .enter()
      .append('text')
      .attr('class', 'lineHoverText')
      .style('fill', (d) => colorMap.get(d))
      .attr('text-anchor', 'start')
      .attr('font-size', 12)
      .attr('dy', (_, i) => `${1 + i * 2}em`)
      .merge(labels);

    const circles = focusPoints.selectAll('.hoverCircle').data(lines);

    circles
      .enter()
      .append('circle')
      .attr('class', 'hoverCircle')
      .style('fill', (d) => colorMap.get(d))
      .attr('r', 2.5)
      .merge(circles);

    focusPoints.append('text').attr('class', 'infoAxisX').attr('id', '#infoAxisX').attr('x', 15).attr('dy', '.31em');

    // TOOLTIP END

    svg
      .append('rect')
      .attr('class', 'zoom')
      .attr('width', width)
      .attr('height', height)
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .on('mouseout', () => {
        focusPoints.style('display', 'none');
      })
      .on('mousemove', mousemove)
      .call(zoom)
      .on('wheel.zoom', null);

    zoom.on('start', () => focusPoints.style('display', 'none')).on('end', mousemove);

    // Конец блока настройки графика

    if (zoomState) applyZoom(zoomState);

    drawLine(multiData, colorMap, linePath, lineChart, area);

    updateCurrencyInfo(balanceRef, entirePercentRef, lastPercentRef, x, multiData, data, width);

    lineNameRef.forEach((val, index) => {
      d3.select(val.current).style('color', colorMap.get(lines[index]));
    });

    btnsRef.forEach((el) => d3.select(el.current).on('click', drawBrush));

    btnsRef.forEach((el) => {
      if (el.current != null) el.current.classList.remove('active');
    });
    // Выделяем последнюю нажатую кнопку (по-умолчанию - 'All time')
    activeButton.current.classList.add('active');

    // Начало блока содержащего вспомогательные функции

    function mousemove() {
      if (isNaN(d3.mouse(this)[0]) || !showInfo) return;
      focusPoints.style('display', null);
      const x0 = x.invert(d3.mouse(this)[0]);
      const i = getBisectDate(data, x0, 1);
      const d0 = data[i - 1];
      const d1 = data[i];
      const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
      const currentX = x(d.date);
      if (currentX > width || currentX < 0) return;

      focusPoints.select('.x-hover-line').attr('transform', `translate(${x(d.date)},${0})`);

      focusPoints
        .selectAll('.hoverCircle')
        .attr('cy', (e) => y(d[e]))
        .attr('cx', x(d.date));

      focusPoints
        .selectAll('.lineHoverText')
        .attr('transform', `translate(${x(d.date)},${height / 3})`)
        .text((e) => `${e} º${formatValue(d[e])}`);

      let maxLength = 80;
      focusPoints.selectAll('.lineHoverText').call((k) => {
        k._groups[0].forEach((el) => {
          if (el.getComputedTextLength() > maxLength) maxLength = el.getComputedTextLength();
        });
      });

      const computedTooltipWidth = 18 + maxLength;

      const computedTooltipHeight = 18 + 23 * lines.length;

      if (x(d.date) > width - width / 4) {
        focusPoints.selectAll('text.lineHoverText').attr('text-anchor', 'end').attr('dx', -20);
        focusPoints
          .select('.tooltip')
          // Положение прямоугольника подсказски
          .attr('height', computedTooltipHeight)
          .attr('width', computedTooltipWidth)
          .attr('transform', `translate(${x(d.date) + 10 - computedTooltipWidth - 20},${height / 3 - 20})`);
        focusPoints
          .select('.infoAxisX')
          .text(() => {
            return `${moment(d.date).format('ddd, D MMM')}`;
          })
          .attr(
            'transform',
            // Положение текста с доп информацией о точке
            `translate(${x(d.date) - 100},${height / 3 - 10})`,
          );
      } else {
        focusPoints.selectAll('text.lineHoverText').attr('text-anchor', 'start').attr('dx', 20);
        focusPoints
          .select('.tooltip')
          // Положение прямоугольника подсказски
          .attr('height', computedTooltipHeight)
          .attr('width', computedTooltipWidth)
          .attr('transform', `translate(${x(d.date) + 10},${height / 3 - 20})`);
        focusPoints
          .select('.infoAxisX')
          .text(() => {
            return `${moment(d.date).format('ddd, D MMM')}`;
          })
          .attr(
            'transform',
            // Положение текста с доп информацией о точке
            `translate(${x(d.date) + 5},${height / 3 - 10})`,
          );
      }
    }

    function drawBrush() {
      let dateStart = x.invert(0);
      let dateEnd = x.invert(0);

      btnsRef.forEach((el) => {
        if (el.current != null) el.current.classList.remove('active');
      });
      // Выделяем только кнопку, на которую нажали
      this.classList.add('active');

      const allTime = dataBtn.length - 1;
      const oneYear = dataBtn.length - 2;
      const oneMonth = dataBtn.length - 3;
      const oneWeek = dataBtn.length - 4;
      const oneDay = dataBtn.length - 5;
      switch (this.innerText) {
        case dataBtn[allTime]: // All time
          dateStart = firstDateOfData;
          dateEnd = lastDateOfData;
          setActiveButton(btnsRef[allTime]);
          break;
        case dataBtn[oneYear]: // 1y
          dateEnd.setFullYear(dateStart.getFullYear() + 1);
          setActiveButton(btnsRef[oneYear]);
          break;
        case dataBtn[oneMonth]: // 1m
          dateEnd.setMonth(dateStart.getMonth() + 1);
          setActiveButton(btnsRef[oneMonth]);
          break;
        case dataBtn[oneWeek]: // 1w
          dateEnd.setDate(dateStart.getDate() + 7);
          setActiveButton(btnsRef[oneWeek]);
          break;
        case dataBtn[oneDay]: // 1d
          dateEnd.setDate(dateStart.getDate() + 1);
          setActiveButton(btnsRef[oneDay]);
          break;
        default:
          dateEnd.setDate(dateStart.getDate() + 1);
          break;
      }

      const start = x2(dateStart);
      const end = x2(dateEnd) > width ? width : x2(dateEnd);
      brush.move(d3.select('.brush').transition().duration(transformTime), [start, end]);
    }

    function applyZoom(t, isBrush) {
      x.domain(t.rescaleX(x2).domain());
      drawLine(multiData, colorMap, linePath, lineChart, area);
      focus.select('.axis--x').call(xAxis);
      if (!isBrush) brush.move(d3.select('.brush'), x.range().map(t.invertX, t));
      updateCurrencyInfo(balanceRef, entirePercentRef, lastPercentRef, x, multiData, data, width);
    }

    // Вызывается при изменении временного периода и при перемотке графика
    function zoomed() {
      const t = d3.event.transform;
      if (d3.event.sourceEvent == null) return;
      applyZoom(t, d3.event.sourceEvent.type === 'brush');
      setZoomState(t);
    }

    // Вызывается при изменении временного периода
    function brushed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') {
        return;
      } // ignore brush-by-zoom
      const s = d3.event.selection || x2.range();
      doBrush(s);
    }

    function doBrush(s) {
      svg.select('.zoom').call(zoom.transform, d3.zoomIdentity.scale(width / (s[1] - s[0])).translate(-s[0], 0));
    }

    // Конец блока содержащего вспомогательные функции
  }, [sizeState, showInfo, lines]);

  return (
    <ChartContainer>
      <InfoWrapper>
        {lines.map((el, index) => (
          <CurrencyInfo ref={currencyInfoRef[index]} key={`curInfo${index}`}>
            <CurrencyInfo.Balance ref={balanceRef[index]} />
            <LineName ref={lineNameRef[index]}>{el}</LineName>
            <CurrencyInfo.Percents>
              <span ref={entirePercentRef[index]} />
              <span ref={lastPercentRef[index]} />
            </CurrencyInfo.Percents>
          </CurrencyInfo>
        ))}
        <BtnWrapper>
          {dataBtn.map((el, index) => (
            <Btn ref={btnsRef[index]} key={`btn${index}`}>
              <span>{el}</span>
            </Btn>
          ))}
        </BtnWrapper>
      </InfoWrapper>
      <CanvasWrapper ref={canvasWrapperRef}>
        <Canvas ref={canvas} />
      </CanvasWrapper>
    </ChartContainer>
  );
};

export default connect(mapStateToProps, {})(ExampleChart);
