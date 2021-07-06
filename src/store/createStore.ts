import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
export type RootState = ReturnType<typeof store.getState>;

export default store;
