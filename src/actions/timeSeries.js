import axios from 'axios';
import Cookies from 'js-cookie';
import * as api from '../constants/api';

export const TIME_SERIES_LOADING = 'time_series_loading';
export const TIME_SERIES_LOADING_SUCCESS = 'time_series_loading_success';
export const TIME_SERIES_LOADING_FAIL = 'time_series_loading_fail';

export const TIME_SERIES_CREATION = 'time_series_creation';
export const TIME_SERIES_CREATION_SUCCESS = 'time_series_creation_success';
export const TIME_SERIES_CREATION_FAIL = 'time_series_creation_fail';

export const getTimeSeriesList = () => async (dispatch) => {
  dispatch({
    type: TIME_SERIES_LOADING,
  });

  try {
    const token = Cookies.get('token');
    const res = await axios.get(api.timeSeries(), {
      headers: {
        Authorization: `cloudToken ${token}`,
      },
    });
    console.log(res);

    return dispatch({
      type: TIME_SERIES_LOADING_SUCCESS,
      data: res.data,
    });
  } catch (error) {
    return dispatch({
      type: TIME_SERIES_LOADING_FAIL,
      message: 'Failed to load time series list',
    });
  }
};

export const createTimeSeries = (name, description) => async (dispatch) => {
  dispatch({
    type: TIME_SERIES_CREATION,
  });

  try {
    const token = Cookies.get('token');
    const res = await axios.post(
      api.timeSeries(),
      {
        name,
        description,
      },
      {
        headers: {
          Authorization: `cloudToken ${token}`,
        },
      },
    );

    return dispatch({
      type: TIME_SERIES_CREATION_SUCCESS,
      data: res.data,
    });
  } catch (error) {
    return dispatch({
      type: TIME_SERIES_CREATION_FAIL,
      message: 'Failed to load time series list',
    });
  }
};
