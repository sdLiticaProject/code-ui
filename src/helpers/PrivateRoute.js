import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { GET_USER_REQUEST } from "../constants/api";
import { LOGIN } from "../constants/routes";

export default function PrivateRoute({ component: Component, ...rest }) {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await Axios.get(GET_USER_REQUEST, {
          headers: { Authorization: Cookies.get("token") }
        });
        setUser(result.data.user);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  if (isError) {
    return (
      <Redirect
        to={{
          pathname: LOGIN
        }}
      />
    );
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <Route
      {...rest}
      render={props =>
        user !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: LOGIN,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.defaultProps = {
  location: {}
};

PrivateRoute.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  component: PropTypes.any.isRequired
};
