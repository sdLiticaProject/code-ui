import React from 'react';
import {Switch, Route, useLocation} from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Routes from '../../Routes';
import TimeSeriesTable from "./timeseries/TimeSeriesTable";

const BucketPage = (): JSX.Element => {
    const location = useLocation();

    return (
        <>
            <Layout>
                <TimeSeriesTable data={bucketExample}/>
            </Layout>
        </>
    );
};

// TODO: Доставь данные в backend
const bucketExample = {
    id: "aa6dd6a228137717",
    name: 'Name 1',
    description: 'Description 1',
    retention: "Forever / 10 ms"
}

export default BucketPage;