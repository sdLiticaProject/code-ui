import React, {useEffect, useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {add, del} from '../actions/userActions';
import * as api from '../constants/api';
import Loader from '../pages/login/components/Loader';

const PrivateRoute = ({component: Component, ...rest}) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(api.getUser(), {
          headers: {Authorization: `cloudToken ${Cookies.get('token')}`}
        });
        const user = {...res.data, roleId: 2};
        setUser(user);
        dispatch(add(user));
      } catch (error) {
        setIsError(true);
        setUser();
        dispatch(del());
        Cookies.remove('token');
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  // TODO: redirect to login page if error found
  if (isError) return <Redirect to="/" />;

  if (isLoading) return <Loader />;

  return (
    <Route
      {...rest}
      render={props => (user !== null ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired
};

export default PrivateRoute;
