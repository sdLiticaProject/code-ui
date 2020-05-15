import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/createStore';

import HomePage from './pages/HomePage';
import CustomBrowserRouter from './helpers/CustomBrowserRouter';
import {LOGIN, HOME, CHART} from './constants/routes';
import Chart from './components/chart/Chart';

function App() {
  return (
    <Provider store={store}>
      <CustomBrowserRouter>
        <Switch>
          <Route path={HOME} component={HomePage} />
          <Route path={CHART} component={Chart} />
          <Redirect from="*" to={LOGIN} />
        </Switch>
      </CustomBrowserRouter>
    </Provider>
  );
}

export default App;
