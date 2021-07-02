import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import userReducer from './userReducer';
import controlReducer from './controlReducer';

export const appReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  chartControl: controlReducer,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
