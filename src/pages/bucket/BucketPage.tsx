import React, {useEffect, useState} from 'react';
import {Switch, Route, useLocation} from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Routes from '../../Routes';
import TimeSeriesTable from "./timeseries/TimeSeriesTable";
import axios from "axios";
import * as api from "../../constants/api";
import Cookies from "js-cookie/src/js.cookie";
import {enqueueSnackbar} from "notistack";

const BucketPage = (): JSX.Element => {
    const [bucketsData, setBucketData] = useState({});
    const [listTimeSeries, setListTimeSeries] = useState([]);

    const location = useLocation();
    const bucketId = location.pathname.split("/").pop();

    useEffect(() => {
        const fetchBucket = async () => {
            try {
                const response = await axios.get(api.bucketList() + `/${bucketId}`, {
                    headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
                });
                setBucketData(response.data);
            } catch (error) {
                enqueueSnackbar("Some problems", {
                    autoHideDuration: 5000,
                    variant: "error"
                })
            }
        };
        fetchBucket();

    }, []);

    return (
        <>
            <Layout>
                <TimeSeriesTable bucketInfo={bucketsData}/>
            </Layout>
        </>
    );
};

export default BucketPage;