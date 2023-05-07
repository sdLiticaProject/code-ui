export interface UserInnerState {
  firstName: string;
  lastName: string;
  id: string;
  email: string;
  roleId?: number;
}

export interface UserState {
  user: UserInnerState | null;
  isLoading: boolean;
  error: null | string;
}

export enum UserActionTypes {
  FETCH_USER = 'FETCH_USER',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = 'FETCH_USER_ERROR',
  USER_DELETE = 'user_delete',
  USER_ADD = 'user_add',
}

export interface FetchUsersAction {
  type: UserActionTypes.FETCH_USER;
}

export interface AddUserAction {
  type: UserActionTypes.USER_ADD;
  payload: UserInnerState | null;
  huynia?: string;
}

export interface DeleteUserAction {
  type: UserActionTypes.USER_DELETE;
}

export type UserAction = FetchUsersAction | AddUserAction | DeleteUserAction;
