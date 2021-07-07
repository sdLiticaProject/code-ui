import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/createStore';
import LoginPage from './pages/login/AuthFormSwitcher';
import HomePage from './pages/home/HomePage';
import CustomBrowserRouter from './helpers/CustomBrowserRouter';
import { LOGIN, HOME } from './constants/routes';
import PrivateRoute from './helpers/PrivateRoute';
import GlobalStyle from './App.styles';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      {/* @ts-ignore */}
      <CustomBrowserRouter>
        <Switch>
          <Route path={LOGIN} component={LoginPage} />
          <PrivateRoute path={HOME} component={HomePage} />
          <Redirect from="*" to={LOGIN} />
        </Switch>
      </CustomBrowserRouter>
    </Provider>
  );
};

export default App;
