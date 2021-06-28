import React from 'react';
import * as Sc from '../HomePage.styles';
import TimeSeriesCollection from '../../../components/ts-collection/TimeSeriesCollection';

function Data() {
  return (
    <Sc.ContentWrapper>
      <Sc.UserInfo>Data</Sc.UserInfo>
      <Sc.InfoBlocksWrapper>
        <TimeSeriesCollection />
      </Sc.InfoBlocksWrapper>
    </Sc.ContentWrapper>
  );
}

Data.propTypes = {};

export default Data;
