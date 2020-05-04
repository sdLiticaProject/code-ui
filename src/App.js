import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/createStore";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CustomBrowserRouter from "./helpers/CustomBrowserRouter";
import { LOGIN, HOME,REGISTR,RECOVERY } from "./constants/routes";
import PrivateRoute from './helpers/PrivateRoute'

function App() {
  return (
    <Provider store={store}>
      <CustomBrowserRouter>
        <Switch>
          <Route path={LOGIN} component={LoginPage}/>
          <Route path={REGISTR} component={LoginPage}/>
          <Route path={RECOVERY} component={LoginPage}/>
          <PrivateRoute path={HOME} component={HomePage} />
          <Redirect from="*" to={LOGIN} />
        </Switch>
      </CustomBrowserRouter>
    </Provider>
  );
}

export default App;
