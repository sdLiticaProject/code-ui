import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/createStore";
import HomePage from "./pages/HomePage";
import CustomBrowserRouter from "./helpers/CustomBrowserRouter";
import Chart from "./components/chart/Chart";
import LoginPage from "./pages/LoginPage";
import { LOGIN, HOME, CHART, REGISTRATION, RECOVERY } from "./constants/routes";
import PrivateRoute from "./helpers/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <CustomBrowserRouter>
        <Switch>
          <Route path={CHART} component={Chart} />
          <Route path={LOGIN} component={LoginPage} />
          <Route path={REGISTRATION} component={LoginPage} />
          <Route path={RECOVERY} component={LoginPage} />
          <PrivateRoute path={HOME} component={HomePage} />
          <Redirect from="*" to={LOGIN} />
        </Switch>
      </CustomBrowserRouter>
    </Provider>
  );
}

export default App;
