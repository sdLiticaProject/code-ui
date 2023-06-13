import React from 'react';
import {Switch, Route, useLocation} from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import ExplorerWidgets from "./explorerWidgets/ExplorerWidgets";

const DashboardHomePage = (): JSX.Element => {
    const location = useLocation();

    const dashboardId = location.pathname.split("/").pop();

    return (
        <>
            <Layout>
                <ExplorerWidgets dashboardId={dashboardId}/>
            </Layout>
        </>
    );
};

export default DashboardHomePage;