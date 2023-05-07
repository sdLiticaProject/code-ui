import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Routes from '../../Routes';

const HomePage = (): JSX.Element => {
  const location = useLocation();

  return (
    <>
      <Layout>
        <Routes />
      </Layout>
    </>
  );
};

export default HomePage;
