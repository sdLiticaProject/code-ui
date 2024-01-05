import {
    LOGIN_SUCCESS,
    LOGIN_LOADING,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_LOADING,
    REGISTER_SUCCESS
} from '../actions/loginActions';
import {UPDATE_FAIL, UPDATE_LOADING, UPDATE_SUCCESS} from "../actions/profileAction";

export const initialState = {
    user: null,
    type: null,
    isLoading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LOADING:
        case LOGIN_LOADING:
        case REGISTER_LOADING:
            return {
                ...state,
                type: action.type,
                isLoading: true,
            };

        case UPDATE_FAIL:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                type: action.type,
                isLoading: false,
                error: action.error,
            };

        case UPDATE_SUCCESS:
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                type: action.type,
                isLoading: false,
            };

        default:
            return state;
    }
};
