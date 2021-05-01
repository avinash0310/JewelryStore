import { applyMiddleware, createStore } from 'redux';
import rootReducer from './rootReducer';
import { httpMiddleware } from '../middleware/middleware.js';

const store = createStore(rootReducer, applyMiddleware(httpMiddleware));
export default store;