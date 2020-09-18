import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import authReducer from './authReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({
    auth: authReducer, game: gameReducer})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));