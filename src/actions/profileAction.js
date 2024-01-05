import axios from "axios";
import * as api from "../constants/api";
import Cookies from "js-cookie";
import {useSelector} from "react-redux";
import {RootState} from "../store/createStore";
import {enqueueSnackbar} from "notistack";

export const UPDATE_LOADING = 'UPDATE_LOADING';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_FAIL = 'UPDATE_FAIL';

export const updateUser = (userId, firstName, lastName) => async (dispatch) => {

        const token = Cookies.get('token');

        dispatch({
            type: UPDATE_LOADING,
        });

        await axios.post(api.updateUser(), {
                userId: userId, firstName: firstName, lastName: lastName,
            }, {
                headers: {
                    Authorization: `cloudToken ${token}`,
                },
            }
        ).then(res => {
            enqueueSnackbar("Update complete", {
                autoHideDuration: 2000,
                variant: "success"
            })
            return dispatch({
                type: UPDATE_SUCCESS,
            });
        }).catch(error => {
            enqueueSnackbar("Update failed", {
                autoHideDuration: 5000,
                variant: "error"
            })
            return dispatch({
                type: UPDATE_FAIL, message: 'Update failed',
            });
        });
    }
;