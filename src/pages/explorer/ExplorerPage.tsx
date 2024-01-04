import React from 'react';
import {Switch, Route, useLocation} from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Routes from '../../Routes';
import ExplorerData from "./explorerData/ExplorerData";

const ExplorerPage = (data): JSX.Element => {
    const location = useLocation();

    return (
        <>
            <Layout>
                <ExplorerData timeseries={data}/>
            </Layout>
        </>
    );
};

export default ExplorerPage;