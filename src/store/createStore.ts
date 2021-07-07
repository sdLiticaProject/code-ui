import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { rootReducer } from '../reducers';
import { UserAction } from '../types/user';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<typeof store.getState, any, UserAction>;

export default store;
