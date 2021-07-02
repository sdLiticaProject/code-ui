import React from 'react';
import { ChartWrapperContainer, WrapperContainer } from './ChartWrapper.styles';
import ChartControl from '../control/ChartControl';
import ExampleChart from '../Chart';

const ChartWrapper = () => {
  return (
    <WrapperContainer>
      <ChartWrapperContainer>
        <ExampleChart />
        <ChartControl />
      </ChartWrapperContainer>
    </WrapperContainer>
  );
};

export default ChartWrapper;
