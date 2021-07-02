import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as Sc from './HomePage.styles';
import Dashboard from './dashboard/Dashboard';
import History from './history/History';
import Data from './data/Data';
import Footer from './components/footer/Footer';
import Tabs from './components/tabs/Tabs';
import MenuWrapper from './components/header-menu/HeaderMenu';

function HomePage() {
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
        <Tabs />
        <Switch>
          <Route exact path="/home">
            <Dashboard />
          </Route>
          <Route path="/home/data">
            <Data />
          </Route>
          <Route path="/home/history">
            <History />
          </Route>
        </Switch>
      </Sc.MainWrapper>
      <Footer />
    </>
  );
}

export default HomePage;
