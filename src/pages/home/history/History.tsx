import React from 'react';
import * as Sc from '../HomePage.styles';

const History = (): JSX.Element => {
  return (
    <Sc.ContentWrapper>
      <Sc.UserInfo>History</Sc.UserInfo>
      <Sc.InfoBlocksWrapper>
        <Sc.InfoBlock>
          <h2>Uploaded data</h2>
          <h3>Types of uploaded data</h3>
        </Sc.InfoBlock>
        <Sc.InfoBlock>
          <h2>Storage usage</h2>
          <h3>Disk space usage statistics</h3>
        </Sc.InfoBlock>
      </Sc.InfoBlocksWrapper>
    </Sc.ContentWrapper>
  );
};

export default History;
