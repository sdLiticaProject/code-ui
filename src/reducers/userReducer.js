import {USER_ADD, USER_DELETE} from '../actions/userActions';

export const initialState = {
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_ADD:
      return {
        ...state,
        user: action.payload
      };

    case USER_DELETE:
      return {
        ...state,
        user: null
      };

    default:
      return state;
  }
};
