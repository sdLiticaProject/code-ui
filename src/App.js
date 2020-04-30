import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/createStore";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CustomBrowserRouter from "./helpers/CustomBrowserRouter";
import { LOGIN, HOME, CHART } from "./constants/routes";
import ExampleChart from "./components/chart/ExampleChart";

function App() {
  return (
    <Provider store={store}>
      <CustomBrowserRouter>
        <Switch>
          <Route exact path={LOGIN} component={LoginPage} />
          <Route path={HOME} component={HomePage} />
          <Route path={CHART} component={ExampleChart} />
          <Redirect from="*" to={LOGIN} />
        </Switch>
      </CustomBrowserRouter>
    </Provider>
  );
}

export default App;
