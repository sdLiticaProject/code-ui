import { UserActionTypes, AddUserAction, UserInnerState, DeleteUserAction } from '../types/user';

export const add = (user: UserInnerState): AddUserAction => {
  return {
    type: UserActionTypes.USER_ADD,
    payload: user,
  };
};

export const del = (): DeleteUserAction => {
  return {
    type: UserActionTypes.USER_DELETE,
  };
};
