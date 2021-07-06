import React from 'react';
import * as Sc from '../HomePage.styles';
import TimeSeriesCollection from '../../../components/ts-collection/TimeSeriesCollection';

const Data = (): JSX.Element => {
  return (
    <Sc.ContentWrapper>
      <Sc.UserInfo>Data</Sc.UserInfo>
      <Sc.InfoBlocksWrapper>
        <TimeSeriesCollection />
      </Sc.InfoBlocksWrapper>
    </Sc.ContentWrapper>
  );
};

export default Data;
