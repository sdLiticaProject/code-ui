import * as d3 from 'd3';
import { height, margin, units, width } from './ChartConstants';

export const clearArea = (canvasRef) => {
  d3.select(canvasRef.current).selectAll('*').remove();
};

export const drawSVG = (canvasRef) => {
  return d3
    .select(canvasRef.current)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);
};

export const getWidth = (currentRef) => {
  return parseInt(d3.select(currentRef).style('width'), 10) - margin.left - margin.right;
};

export const drawLine = (multiData, z, linePath, lineChart, area) => {
  const mData = lineChart.selectAll('.multiData').data(multiData);

  mData.exit().remove();

  mData
    .enter()
    .insert('g', '.somePath')
    .append('path')
    .attr('class', 'line multiData')
    .style('stroke', (d) => z.get(d.id))
    .merge(mData)
    .attr('d', (d) => linePath(d.values));

  if (multiData.length === 1) {
    lineChart.append('path').datum(multiData[0].values).attr('class', 'area multiData').attr('d', area);
    d3.select('.stop-left').style('stop-color', z.get(multiData[0].id));
  }
};

export const getBisectDate = d3.bisector((d) => d.date).left;

export const updateCurrencyInfo = (balanceRef, entirePercentRef, lastPercentRef, x, multiData, data, currentWidth) => {
  const x0 = x.invert(currentWidth);
  const i0 = getBisectDate(data, x.invert(0), 1);
  const i = getBisectDate(data, x0, 1);
  multiData.forEach((d, j) => {
    const first = d.values[i0].y;
    const balance = d.values[i].y;
    const prevBalance = d.values[i - 1].y;

    const styleLastPercent = balance > prevBalance ? '#43B99C' : '#E25955';
    const signLastPercent = balance > prevBalance ? '+' : '-';
    const diffLastPercent = balance > prevBalance ? ((balance - prevBalance) * 100) / prevBalance : ((prevBalance - balance) * 100) / prevBalance;

    const styleEntirePercent = balance > first ? '#43B99C' : '#E25955';
    const signEntirePercent = balance > first ? '+' : '-';
    const diffEntirePercent = balance > first ? ((balance - first) * 100) / first : ((first - balance) * 100) / first;

    d3.select(balanceRef[j].current).html(`${units}${balance.toFixed(2)}`);
    d3.select(entirePercentRef[j].current)
      .style('color', styleEntirePercent)
      .html(`${signEntirePercent}${diffEntirePercent.toFixed(2)}%`);
    d3.select(lastPercentRef[j].current)
      .style('color', styleLastPercent)
      .html(` ${signLastPercent}${diffLastPercent.toFixed(2)}%`);
  });
};
