import Cookies from 'js-cookie';
import axios from 'axios';
import * as api from '../constants/api';

export const LOGIN_LOADING = 'login_loading';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAIL = 'login_fail';

export const LOGOUT_LOADING = 'LOGOUT_LOADING';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

export const REGISTER_LOADING = 'REGISTER_LOADING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({
    type: LOGIN_LOADING,
  });

  try {
    const res = await axios.post(api.loginUser(), {
      email,
      password,
    });

    Cookies.set('token', res.data.entity.token, { expires: 5 });
    return dispatch({
      type: LOGIN_SUCCESS,
    });
  } catch (error) {
    return dispatch({
      type: LOGIN_FAIL,
      message: 'login failed',
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: LOGOUT_LOADING,
  });
  try {
    const res = await axios.post(
      api.logoutUser(),
      {},
      {
        headers: { Authorization: `cloudToken ${Cookies.get('token')}` },
      },
    );
    if (res.status !== 204) {
      throw Error(res.data.message);
    }
    return dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    return dispatch({
      type: LOGOUT_FAIL,
      error,
    });
  }
};

export const registerUser = (email, password, firstName, lastName) => async (dispatch) => {
  dispatch({
    type: REGISTER_LOADING,
  });

  try {
    const res = await axios.post(api.registerUser(), {
      email,
      password,
      firstName,
      lastName,
    });
    if (res.status !== 201) {
      throw Error(res.data.message);
    }
    dispatch({
      type: REGISTER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      error,
    });
  }
};
