import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { rootReducer } from './rootReducer';

const middlewares = [thunk];

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer , composedEnhancers);