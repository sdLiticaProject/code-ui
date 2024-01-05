import {Route, Switch} from "react-router-dom";
import * as routes from "./constants/routes";
import Dashboards from "./pages/home/dashboards/Dashboards";
import Data from "./pages/home/data/Data";
import Main from "./pages/home/main/Main";
import UserProfile from "./pages/home/profile/UserProfile";
import React from "react";
import Buckets from "./pages/home/buckets/Buckets";

const Routes = () => {
    return (
        <Switch>
            <Route exact path={routes.HOME}>
                <Main />
            </Route>
            <Route path={routes.PAGE_USER_DASHBOARD}>
                <Dashboards />
            </Route>
            <Route path={routes.PAGE_USER_BUCKETS}>
                <Buckets />
            </Route>
            <Route path={routes.PAGE_USER_PROFILE}>
                <UserProfile />
            </Route>
        </Switch>
    );
};

export default Routes;
