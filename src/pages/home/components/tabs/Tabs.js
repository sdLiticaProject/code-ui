import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as Sc from '../../HomePage.styles';
import * as routes from '../../../../constants/routes';

function Tabs() {
  const location = useLocation();
  const history = useHistory();

  return (
    <Sc.TabsWrapper>
      <Sc.Tab isActive={location.pathname === routes.HOME} onClick={() => history.push(routes.HOME)}>
        Dashboard
      </Sc.Tab>
      <Sc.Tab isActive={location.pathname === routes.PAGE_USER_DATA} onClick={() => history.push(routes.PAGE_USER_DATA)}>
        My data
      </Sc.Tab>
      <Sc.Tab isActive={location.pathname === routes.PAGE_USER_HISTORY} onClick={() => history.replace(routes.PAGE_USER_HISTORY)}>
        Analysis history
      </Sc.Tab>
    </Sc.TabsWrapper>
  );
}

export default Tabs;
