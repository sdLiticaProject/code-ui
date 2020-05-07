import React, { useEffect } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import rate from "../../data/exampleExchangeRate.json";
import "./ExampleChart.css";
import { clearArea, drawSVG } from "./ChartFunctions";
import { height, height2, margin, margin2, width } from "./ChartConstants";
import {
  Btn,
  Canvas,
  CurrencyInfo,
  ChartContainer,
  MoneyBalance,
  InfoWrapper,
  BtnWrapper
} from "./ExampleChart.styles";

let dataBtn = ["1d", "1w", "1m", "1y", "All time"];

const ExampleChart = () => {
  const canvas = React.createRef();
  const quoteRef = React.createRef();
  const btnsRef = dataBtn.map(() => React.createRef());
  const currencyRef = React.createRef();
  const firstPercentRef = React.createRef();
  const percentRef = React.createRef();

  const data = rate.map(function(d) {
    return {
      x: new Date(d.DATE),
      y: d.CLOSE,
    };
  });

  let doShow = true;
  const showZoom = true;

  useEffect(() => {
    clearArea(canvas);

    const svg = drawSVG(canvas);

    const x = d3.scaleTime().range([0, width]);
    const x2 = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const y2 = d3.scaleLinear().range([height2, 0]);

    const xAxis = d3.axisBottom(x);
    const xAxis2 = d3.axisBottom(x2);
    const yAxis = d3.axisLeft(y);

    const bisectDate = d3.bisector(function(d) {
      return d.x;
    }).left;

    const money = d3.select(currencyRef.current);
    const firstpercent = d3.select(firstPercentRef.current);
    const percent = d3.select(percentRef.current);
    const quote = d3.select(quoteRef.current);

    const brush = d3
      .brushX()
      .extent([
        [0, 0],
        [width, height2],
      ])
      .on("brush end", brushed);

    const line = d3
      .area()
      .x(function(d) {
        return x(d.x);
      })
      .y0(height)
      .y1(function(d) {
        return y(d.y);
      });

    const line2 = d3
      .area()
      .x(function(d) {
        return x2(d.x);
      })
      .y0(height2)
      .y1(function(d) {
        return y2(d.y);
      });

    svg
      .append("defs")
      .append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width)
      .attr("height", height)
      .attr("x", 0)
      .attr("y", 0)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${width} ${height}`);

    var svgDefs = svg.append("defs");
    var mainGradient = svgDefs
      .append("linearGradient")
      .attr("id", "mainGradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");
    mainGradient
      .append("stop")
      .attr("class", "stop-left")
      .attr("offset", "0");

    mainGradient
      .append("stop")
      .attr("class", "stop-right")
      .attr("offset", "1");

    const lineChart = svg
      .append("g")
      .attr("class", "chart")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .attr("clip-path", "url(#clip)");

    const focus = svg
      .append("g")
      .attr("class", "focus")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const zoomscale = svg
      .append("g")
      .attr("class", "context")
      .attr("transform", `translate(${margin2.left},${margin2.top})`);

    x.domain(
      d3.extent(data, function(d) {
        return d.x;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.y;
      }),
    ]);

    x2.domain(x.domain());
    y2.domain(y.domain());

    focus
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    focus
      .append("g")
      .attr("class", "axis axis--y")
      .call(yAxis);

    lineChart
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

    zoomscale
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line2);

    zoomscale
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0,${height2})`)
      .call(xAxis2);

    zoomscale
      .append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, x.range());

    const focusPoints = focus
      .append("g")
      .attr("class", "focusPoints")
      .style("display", "none");

    focusPoints
      .append("line")
      .attr("class", "x-hover-line hover-line")
      .attr("y1", 0)
      .attr("y2", height);

    focusPoints
      .append("line")
      .attr("class", "y-hover-line hover-line")
      .attr("x1", 0)
      .attr("x2", width);

    focusPoints.append("circle").attr("r", 2.5);

    focusPoints
      .append("rect")
      .attr("class", "tooltip")
      .attr("rx", 15)
      .attr("width", 85)
      .attr("height", 30);

    focusPoints
      .append("text")
      .attr("x", 15)
      .attr("dy", ".31em");

    svg
      .append("rect")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() {
        if (doShow) {
          focusPoints.style("display", null);
        }
      })
      .on("mouseout", function() {
        focusPoints.style("display", "none");
      })
      .on("mousemove", mousemove);

    function mousemove() {
      if (doShow) {
        const x0 = x.invert(d3.mouse(this)[0]);
        const i = bisectDate(data, x0, 1);
        const d0 = data[i - 1];
        const d1 = data[i];
        const d = x0 - d0.x > d1.x - x0 ? d1 : d0;

        focusPoints
          .select(".tooltip")
          .attr("transform", `translate(${-40},${-36})`);

        focusPoints.attr("transform", `translate(${x(d.x)},${y(d.y)})`);
        focusPoints
          .select("text")
          .text(function() {
            return d.y;
          })
          .attr("transform", `translate(${-40},${-20})`);

        focusPoints.select(".x-hover-line").attr("y2", height - y(d.y));
        focusPoints.select(".y-hover-line").attr("x2", -x(d.x));
      }
    }

    const i0 = bisectDate(data, x2.invert(0), 1);
    const i = bisectDate(data, x2.invert(width), 1);
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
        : ((prev - first) * 100) / first;

    money.style("font-size", "150%").html(current);

    firstpercent
      .style("color", styleFirst)
      .html(`${signFisrt}${diffFirst.toFixed(2)}%`);

    percent.style("color", style).html(` ${sign}${diff.toFixed(2)}%`);

    btnsRef.forEach((el) => d3.select(el.current).on("click", drawBrush));

    function drawBrush() {
      let dateStart = x.invert(0);
      let dateEnd = x.invert(0);
      switch (this.innerText) {
        case "All time":
          dateStart = data[0].x;
          dateEnd = data[data.length - 1].x;
          break;
        case "1y":
          dateEnd.setFullYear(dateStart.getFullYear() + 1);
          break;
        case "1m":
          dateEnd.setMonth(dateStart.getMonth() + 1);
          break;
        case "1w":
          dateEnd.setDate(dateStart.getDate() + 7);
          break;
        case "1d":
          dateEnd.setDate(dateStart.getDate() + 1);
          break;
        default:
          dateEnd.setDate(dateStart.getDate() + 1);
          break;
      }

      const start = x2(dateStart);
      const end = x2(dateEnd) > 800 ? 800 : x2(dateEnd);

      brush.move(
        d3
          .select(".brush")
          .transition()
          .duration(500),
        [start, end]
      );
    }

    function brushed() {
      if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") {
        return;
      } // ignore brush-by-zoom
      const s = d3.event.selection || x2.range();
      x.domain(s.map(x2.invert, x2));
      lineChart.select(".line").attr("d", line);
      focus.select(".axis--x").call(xAxis);

      const x0 = x.invert(width);
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

      money.html(current);
      firstpercent
        .style("color", styleFirst)
        .html(`${signFisrt}${diffFirst.toFixed(2)}%`);

      percent.style("color", style).html(` ${sign}${diff.toFixed(2)}%`);
    }
  }, []);

  return (
    <ChartContainer>
      <InfoWrapper>
        <CurrencyInfo ref={quoteRef}>
          <MoneyBalance ref={currencyRef} />
          <br />
          <span ref={firstPercentRef} />
          <span ref={percentRef} />
        </CurrencyInfo>
        <BtnWrapper>
          {dataBtn.map((el, index) => (
            <Btn ref={btnsRef[index]} key={index}>
              <span>{el}</span>
            </Btn>
          ))}
        </BtnWrapper>
      </InfoWrapper>
      <Canvas ref={canvas} />
      <div>
        <span>Показывать доп. информацию от точке</span>
        <input
          type="checkbox"
          defaultChecked={doShow}
          onChange={() => {
            doShow = !doShow;
          }}
        />
      </div>
    </ChartContainer>
  );
};

ExampleChart.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      x: PropTypes.number,
      y: PropTypes.number,
    })
  ).isRequired,
};

export default connect()(ExampleChart);
