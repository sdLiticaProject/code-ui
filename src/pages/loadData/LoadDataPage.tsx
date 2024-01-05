import React from 'react';
import {Switch, Route, useLocation} from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Routes from '../../Routes';
import LoadData from "./loaddata/LoadData";

const LoadDataPage = (): JSX.Element => {
    const location = useLocation();

    return (
        <>
            <Layout>
                <LoadData/>
            </Layout>
        </>
    );
};

export default LoadDataPage;