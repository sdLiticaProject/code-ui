import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/createStore';
import LoginPage from './pages/login/AuthFormSwitcher';
import HomePage from './pages/home/HomePage';
import CustomBrowserRouter from './helpers/CustomBrowserRouter';
import {LOGIN, HOME, EXPLORER, GUIDES, DASHBOARD} from './constants/routes';
import PrivateRoute from './helpers/PrivateRoute';
import GlobalStyle from './App.styles';
import {Helmet} from "react-helmet";
import {SnackbarProvider} from "notistack";
import DashboardHomePage from "./pages/dashboard/DashboardHomePage";

export const APP_VERSION = '0.2.0';
const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <Helmet>
                <title>sdLitica</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
                      rel="stylesheet"
                />
            </Helmet>
            <GlobalStyle/>
            {/* @ts-ignore */}
            <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                <CustomBrowserRouter>
                    <Switch>
                        <Route path={LOGIN} component={LoginPage}/>
                        <PrivateRoute path={HOME} component={HomePage}/>
                        <PrivateRoute path={DASHBOARD} component={DashboardHomePage}/>
                        <PrivateRoute path={GUIDES} component={HomePage}/>
                        <PrivateRoute path={EXPLORER} component={HomePage}/>
                        <Redirect from="*" to={LOGIN}/>
                    </Switch>
                </CustomBrowserRouter>
            </SnackbarProvider>
        </Provider>
    );
};

export default App;
