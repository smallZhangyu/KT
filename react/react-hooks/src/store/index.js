import { createStore, combineReducers } from 'redux';
import counterReducers from './counterReducer';
import messageReducers from './messageReducer';

const reducers = combineReducers(counterReducers, messageReducers);

const store = createStore(reducers);

export default store;
