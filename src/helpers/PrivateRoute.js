/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect, useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {add, del} from '../actions/userActions';
import * as api from '../constants/api';
import Loader from '../components/loader/Loader';

const PrivateRoute = ({component: Component, ...rest}) => {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(api.getUser(), {
                    headers: {Authorization: `cloudToken ${Cookies.get('token')}`},
                });
                const userData = {...res.data, roleId: 2};
                setUser(userData);
                dispatch(add(userData));
            } catch (error) {
                setIsError(true);
                setUser();
                dispatch(del());
                Cookies.remove('token');
            }
            setIsLoading(false);
        };
        fetchUser();
    }, [dispatch]);

    // TODO: redirect to login page if error found
    if (isError) return <Redirect to="/"/>;

    if (isLoading) return <Loader/>;

    return <Route {...rest} render={(props) => (user !== null ? <Component {...props} /> : <Redirect to="/"/>)}/>;
};

export default PrivateRoute;
