import { UserAction, UserState, UserActionTypes } from '../types/user';

export const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

export default (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.USER_ADD:
      return {
        ...state,
        user: action.payload,
      };

    case UserActionTypes.USER_DELETE:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
