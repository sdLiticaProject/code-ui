import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import * as Sc from './HomePage.styles';
import Dashboard from './dashboard/Dashboard';
import History from './history/History';
import Data from './data/Data';
import UserProfile from './profile/UserProfile';
import Footer from './components/footer/Footer';
import Tabs from './components/tabs/Tabs';
import MenuWrapper from './components/header-menu/HeaderMenu';
import * as routes from '../../constants/routes';

const HomePage = (): JSX.Element => {
  const location = useLocation();

  return (
    <>
      <Sc.HeaderWrapper>
        <Sc.MenuLogoWrapper>
          <Sc.MenuLogoGradient>
            <Sc.MenuLogoImage />
          </Sc.MenuLogoGradient>
        </Sc.MenuLogoWrapper>
        <MenuWrapper />
      </Sc.HeaderWrapper>
      <Sc.MainWrapper>
        {!location.pathname.includes(`${routes.PAGE_USER_PROFILE}`) && <Tabs />}
        <Switch>
          <Route exact path={routes.HOME}>
            <Dashboard />
          </Route>
          <Route path={routes.PAGE_USER_DATA}>
            <Data />
          </Route>
          <Route path={routes.PAGE_USER_PROFILE}>
            <UserProfile />
          </Route>
          <Route path={routes.PAGE_USER_HISTORY}>
            <History />
          </Route>
        </Switch>
      </Sc.MainWrapper>
      <Footer />
    </>
  );
};

export default HomePage;
