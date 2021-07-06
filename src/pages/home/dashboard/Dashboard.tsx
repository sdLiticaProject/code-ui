import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/createStore';
import * as Sc from '../HomePage.styles';

const Dashboard = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <Sc.ContentWrapper>
      <Sc.UserInfo>
        Hello, {user?.firstName} {user?.lastName}
      </Sc.UserInfo>
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

export default Dashboard;
